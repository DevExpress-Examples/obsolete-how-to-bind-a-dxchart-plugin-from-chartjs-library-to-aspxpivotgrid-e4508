/* 
* DXTREME ENTERPRISE
* Version: 12.2.3
* Build date: Dec 11, 2012
*
* Copyright (c) 2012 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: DevExpress.com/EULA-DXTREME-HTML
*/
"use strict";(function(n,t){t.framework={}})(jQuery,DevExpress),function(n,t){var i=t.Class;t.framework.Route=i.inherit({_trimSeparators:function(n){return n.replace(/^[/.]+|[/.]+$/g,"")},_escapeRe:function(n){return n.replace(/\W/g,"\\$1")},_checkConstraint:function(n,t){n=String(n),typeof t=="string"&&(t=new RegExp(t));var i=t.exec(n);return!i||i[0]!==n?!1:!0},_ensureReady:function(){var i,r,t=this;if(this._patternRe)return!1;this._pattern=this._trimSeparators(this._pattern),this._patternRe="",this._params=[],this._segments=[],this._separators=[],this._pattern.replace(/[^/.]+/g,function(n,i){t._segments.push(n),i&&t._separators.push(t._pattern.substr(i-1,1))}),n.each(this._segments,function(n){var u=!0,i=this,r=n?t._separators[n-1]:"";i.charAt(0)===":"?(u=!1,i=i.substr(1),t._params.push(i),t._patternRe+="(?:"+r+"([^/.]+))",i in t._defaults&&(t._patternRe+="?")):t._patternRe+=r+t._escapeRe(i)}),this._patternRe=new RegExp("^"+this._patternRe+"$")},ctor:function(n,t,i){this._pattern=n||"",this._defaults=t||{},this._constraints=i||{}},parse:function(t){var r=this,i;return(this._ensureReady(),!this._patternRe.test(t))?!1:(i=n.extend({},this._defaults),n.each(this._params,function(n){i[this]=RegExp["$"+(n+1)]||i[this]}),n.each(this._constraints,function(n){if(!r._checkConstraint(i[n],r._constraints[n]))return i=!1,!1}),i)},format:function(t){var r=this,f;this._ensureReady();var u=n.extend({},this._defaults),e=0,i=[],o=[],s={};return(n.each(t,function(n){n in u||(s[n]=!0)}),n.each(this._segments,function(n,f){if(i[n]=n?r._separators[n-1]:"",f.charAt(0)===":"){var h=f.substr(1);if(!(h in t)&&!(h in r._defaults)||h in r._constraints&&!r._checkConstraint(t[h],r._constraints[h]))return i=null,!1;h in t?(t[h]!==undefined&&(u[h]=t[h],i[n]+=t[h],e=n),delete s[h]):h in u&&(i[n]+=u[h],o.push(n))}else i[n]+=f,e=n}),!n.isEmptyObject(s))?!1:(n.each(t,function(){if(!this in u)return i=null,!1}),i===null)?!1:(o.length&&n.map(o,function(n){n>=e&&(i[n]="")}),f=i.join(""),f=f.replace(/(.*)\/$/,"$1"))}}),t.framework.MvcRouter=t.Class.inherit({ctor:function(){this._registry=[]},_trimSeparators:function(n){return n.replace(/^[/.]+|[/.]+$/g,"")},_createRoute:function(n,i,r){return new t.framework.Route(n,i,r)},register:function(n,t,i){this._registry.push(this._createRoute(n,t,i))},parse:function(t){var i;return t=this._trimSeparators(t),n.each(this._registry,function(){var n=this.parse(t);if(n!==!1)return i=n,!1}),i?i:!1},format:function(t){var i;return(t=t||{},n.each(this._registry,function(){var n=this.format(t);if(n!==!1)return i=n,!1}),typeof i=="string")?i:!1}})}(jQuery,DevExpress),function(n,t){var i=t.ui;t.framework.dxCommand=i.Component.inherit({ctor:function(t,i){n.isPlainObject(t)&&(i=t,t=n("<div />")),this.beforeExecute=n.Callbacks(),this.afterExecute=n.Callbacks(),this.callBase(t,i)},_defaultOptions:function(){return n.extend(this.callBase(),{action:null,id:null,title:"",icon:"",iconSrc:"",location:"",canExecute:null,hightlighted:!1})},execute:function(){if(!this.canExecute.apply(this,arguments))throw new Error("Cannot execute command:"+this._options.id);this.beforeExecute.fire(arguments),this._createAction("action").apply(this,arguments),this.afterExecute.fire(arguments)},canExecute:function(){var n=!0,t=this._options.canExecute;return t&&(n=this._options.canExecute.apply(this._options,arguments)),n}}),i.registerComponent("dxCommand",t.framework.dxCommand)}(jQuery,DevExpress),function(n,t,i){var u=t.Class,r;t.framework.BrowserNavigationDevice=u.inherit({ctor:function(){var t=this;t.urichanged=n.Callbacks();n(window).on("hashchange",function(){t.urichanged.fire()})},getUri:function(){return document.location.hash.replace("#","")},setUri:function(n){document.location.hash="#"+n}}),r={current:"current",blank:"blank",back:"back"},t.framework.NavigationManager=u.inherit({_onUriChanged:function(){this.navigate()},ctor:function(r){r=r||{};var u=this;u.history=[],u.currentUri=i,u.navigating=n.Callbacks(),u.navigated=n.Callbacks(),u._navigationDevice=r._navigationDevice||new t.framework.BrowserNavigationDevice,u._navigationDevice.urichanged.add(function(){u._onUriChanged()})},navigate:function(n,t){var r,u;if(t=t||{},n===i&&(n=this._navigationDevice.getUri()),r={currentUri:this.currentUri,uri:n,options:t},this.navigating.fire(r),r.cancel){this._navigationDevice.setUri(this.currentUri);return}t.clearHistory&&this.clearHistory(),this.currentUri!==n&&(u=this.currentUri,this.currentUri=n,this._navigationDevice.setUri(n),this.navigated.fire({uri:n,previousUri:u,target:t.target||this._predictTarget(n)}))},_predictTarget:function(n){return this.history.length>1&&this.history[this.history.length-2].uri===n?r.back:r.blank},back:function(n){var t=this.history.length>1?this.history[this.history.length-2]:i;t?this.navigate(t.uri,{target:r.back,viewInfo:t}):this.navigate(n,{clearHistory:!0})},indexOf:function(t){return n.inArray(t,this.history)},getViewByIndex:function(n){return this.history[n]},push:function(n){this.history.push(n)},addView:function(n,t){t===r.back?this.pop(2):t===r.current&&this.pop(),this.push(n)},getView:function(n){for(var t=this.history.length-1;t>=0;t--)if(this.history[t].uri===n)return this.history[t]},pop:function(n){for(n=n||1;--n;)this.history.pop();return this.history.pop()},clearHistory:function(){this.history.length=0}}),t.framework.NavigationManager.NAVIGATION_TARGETS=r}(jQuery,DevExpress),function(n,t,i){t.framework.createActionExecutors=function(t){return{routing:{execute:function(i){var u,f,r;n.isPlainObject(i.action)&&(u=i.action.backBehaviour,i.action.backBehaviour&&delete i.action.backBehaviour,f=i.action,r=t.router.format(f),u?t.back(r):t.navigate(r),i.handled=!0)}},hash:{execute:function(r){if(typeof r.action=="string"&&r.action.charAt(0)==="#"){var u=r.action.substr(1),f=u.replace(/{([_A-Za-z0-9.]+)}/gm,function(t,u){var f=r.args[0].model,e=u.split(".");return n.each(e,function(n,t){if(f===i)return!1;f=ko.utils.unwrapObservable(f[t])}),f!==i?f:t});t.navigate(f),r.handled=!0}}}}}}(jQuery,DevExpress),function(n,t){var r=t.Class,u=t.framework.NavigationManager.NAVIGATION_TARGETS,e="Error",f="Back",i=t.framework;t.framework.Application=r.inherit({ctor:function(i){this.ns=i.ns||window,this.components=[],this.router=i.router||new t.framework.MvcRouter,this.navigationManager=i.navigationManager||new t.framework.NavigationManager,this.navigationManager.navigated.add(n.proxy(this._onNavigated,this)),this.navigation=this._createNavigationCommands(i.navigation),this.beforeViewSetup=n.Callbacks(),this.afterViewSetup=n.Callbacks(),this.viewShowing=n.Callbacks(),this.viewShown=n.Callbacks(),t.registerActionExecutor(t.framework.createActionExecutors(this)),this.components.push(this.router),this.components.push(this.navigationManager)},_createNavigationCommands:function(t){var r=this;return t?n.map(t,function(t){var u;return u=t instanceof i.dxCommand?t:new i.dxCommand(n.extend({location:"navigation"},t)),u.beforeExecute.add(function(){u.option("clearHistory")!==!1&&r.navigationManager.clearHistory()}),u}):[]},_callComponentMethod:function(t,i){var r=[];return n.each(this.components,function(n,u){if(u[t]){var f=u[t](i);f&&f.done&&r.push(f)}}),n.when.apply(n,r)},init:function(){return this._callComponentMethod("init")},_onNavigated:function(n){var t=this,r,i,u;if(/^_back(\|(.+))?$/.test(n.uri)){t.back(RegExp.$2);return}r=this.router.parse(n.uri),i=this.router.format(r),n.uri!==i?this.navigate(i,{clearHistory:!n.uri}):(u=t._aquireView(n.uri,n.target),t._setCurrentView(u,n.target))},_aquireView:function(n,t){var i;return i=t===u.back?this.navigationManager.getView(n):this._createView(n)},_processEvent:function(n,t){this._callComponentMethod(n,t),this[n]&&this[n].fire&&this[n].fire(t)},_createView:function(n){var i=this.router.parse(n),t={viewName:i.view,uri:n};return this._processEvent("beforeViewSetup",{routeData:i,viewInfo:t}),t.model=t.model||this._createModel(i),this._processEvent("afterViewSetup",t),this._appendBackCommand(t),t},_createModel:function(n){var t=function(){return{}};return n.view in this.ns&&(t=this.ns[n.view]),t.call(this.ns,n)},_appendBackCommand:function(i){var r,u,e;this.navigationManager.history.length&&(r=i.model.commands=i.model.commands||[],u=n.grep(r,function(n){return n.option("behavior")==="back"}),u.length||(e=new t.framework.dxCommand({id:"back",title:f,location:"back",behavior:"back",action:"#_back",icon:"arrowleft",type:"back"}),r.push(e)))},_setCurrentView:function(n,i){var u=this,r={viewInfo:n,target:i},f;if(u._processEvent("viewShowing",r),f=r.viewInfo.model.viewShowing,f&&f.call(n.model,r),!r.cancel)return u.navigationManager.addView(n,i),t.data.utils.DataSourceLoadLock.obtain(),u._setCurrentViewAsyncImpl(r.viewInfo,i).done(function(){u._highlightCurrentNavigationCommand(n),t.data.utils.DataSourceLoadLock.release(),u._processEvent("viewShown",r);var i=r.viewInfo.model.viewShown;i&&i.call(n.model,r)})},_highlightCurrentNavigationCommand:function(t){var i=this;n.each(this.navigation,function(n,r){"currentNavigationItemId"in t.model?r.option("highlighted",t.model.currentNavigationItemId===r.option("id")):i._selectNavigationItemByUri(r,t.uri)})},_selectNavigationItemByUri:function(n,t){var r="#"+t,i=n.option("action");typeof i=="string"&&/^#/.test(i)&&i===r?n.option("highlighted",!0):n.option("highlighted",!1)},_setCurrentViewAsyncImpl:t.abstract,navigate:function(n,t){var i=this;i._inited?i.navigationManager.navigate(n,t):i.init().done(function(){i._inited=!0,i.navigate(n,t)})},back:function(n){this.navigationManager.back(n)},handleError:function(){this.navigationManager.navigated.empty(),this.navigationManager.navigated=n.Callbacks(),this.navigationManager.navigated.add(n.proxy(this._onNavigated,this))}})}(jQuery,DevExpress),function(n,t){var r=function(t){t.appendTo(n("#__hidden-bag"))};t.framework.html={layoutControllers:{},utils:{removeFromViewPort:r}},n(function(){n('<div id="__hidden-bag"><\/div>').appendTo(n(document.body)).hide()})}(jQuery,DevExpress),function(n,t){var r=t.framework.html.commandToDXWidgetAdapters={},u=function(n,t){var i=!!n.option("icon")||n.option("iconSrc");return t.showText||!i?n.option("title"):""},i=function(n,t,i){var r=!!n.option("title");return t.showIcon||!r?n.option(i):undefined},f=function(n){return n.option("type")?n.option("type"):undefined};r.dxToolbar={addCommand:function(t,r,e){var h=t.data("dxToolbar"),o={widget:"button"},c=h.option("items"),s;c.push(o),s=function(){var c={text:u(r,e),click:function(){r.canExecute()&&r.execute()},icon:i(r,e,"icon"),iconSrc:i(r,e,"iconSrc"),type:f(r,e)},l=(t.data("dx-left-locations")||"").split(";"),a=(t.data("dx-right-locations")||"").split(";"),s;n.inArray(r.option("location"),l)>-1&&(s="left"),n.inArray(r.option("location"),a)>-1&&(s="right"),o.options=c,o.align=s,h._refresh()},s(),r.optionChanged.add(s),t.show()}},r.dxList={addCommand:function(n,t,r){var o=n.data("dxList"),f={},s=o.option("items"),e;s.push(f),e=function(){f.title=u(t,r),f.click=function(){t.execute()},f.icon=i(t,r,"icon"),f.iconSrc=i(t,r,"iconSrc"),o._refresh()},e(),t.optionChanged.add(e)}},r.dxNavBar={addCommand:function(n,t,r){var e=n.data("dxNavBar"),f={command:t},o=e.option("items"),h,s;o.push(f),h=function(){for(var n=0;n<o.length;n++)if(o[n].highlighted){e.option("selectedIndex",n);break}},s=function(){f.text=u(t,r),f.icon=i(t,r,"icon"),f.iconSrc=i(t,r,"iconSrc"),f.highlighted=t.option("highlighted"),h(),e._refresh()},s(),t.optionChanged.add(s),e.option("itemClick",function(n){n.itemData.command.execute()})}}}(jQuery,DevExpress),function(n,t){var r=t.Class;t.framework.html.CommandManager=r.inherit({ctor:function(n){n=n||{},this.globalCommands=n.globalCommands||[],this.commandToWidgetRegistry=[this._commandToDXWidget]},_commandToDXWidget:function(n,i,r){var u,f,e;return(r=r||{},u=i.data("dxComponents"),u&&(f=u[0],e=t.framework.html.commandToDXWidgetAdapters,f in e))?(e[f].addCommand(i,n,r),!0):!1},_createCommand:function(t,i){var r=n(t);return ko.applyBindings(i,t),r.data("dxCommand")},createCommands:function(n,t){t=t||{};var r=this,i=[];return n.find("*[data-dx-role='command']").each(function(){i.push(r._createCommand(this,t))}),i},_mapCommands:function(t,i){var r=[];return t.find("*[data-dx-command-container]").each(function(){var t=n(this),e=t.data("dx-command-container"),u=new Function("return {"+e+"}")(),f={$container:t,commands:[],options:u};r.push(f),n.each(u,function(t){n.each(i,function(n,i){i&&i.option("location")===t&&f.commands.push(i)})})}),r},_attachCommands:function(t){var i=this;n.each(t,function(t,r){n.each(r.commands,function(t,u){var f=u.option("location"),e={showText:!0,showIcon:!0},o=r.options[f]||{};i._attachCommandToContainer(u,r.$container,n.extend({},e,o))})})},_attachCommandToContainer:function(t,i,r){var u=!1;n.each(this.commandToWidgetRegistry,function(n,f){return u=f(t,i,r),!u}),u||this._defaultCommandToContainer(t,i,r)},_defaultCommandToContainer:function(n,t){var r=n.rootElement();if(r){t.append(r);r.on("click",function(){n.execute()})}},layoutCommands:function(n,t){var i=this.globalCommands.concat(t||[]),r=this._mapCommands(n,i);this._attachCommands(r)}})}(jQuery,DevExpress),function(n,t){var e=t.Class,u=t.framework.NavigationManager.NAVIGATION_TARGETS,r="*[data-dx-placeholder]:not(*[data-dx-placeholder] *[data-dx-placeholder])",f=function(n){return"[data-dx-placeholder='"+n+"']"};t.framework.html.DefaultLayoutController=e.inherit({ctor:function(n){this.currentViewIndex=-1,n&&this.init(n)},init:function(n){this._navigationManager=n.navigationManager,this.$viewPort=n.$viewPort},_getDirection:function(n){switch(n){case u.back:return"backward";case u.blank:return"forward";default:return"none"}},showView:function(n,t){return this._showViewImpl(n,t)},_showViewImpl:function(t,i){var u=this,o=t.renderResult.$markup,s,e;return u._equalLayouts(u.$viewPort,o)?(s=n.map(u.$viewPort.find(r),function(t){var r=n(t),e=r.data("dx-placeholder"),s=u._disableTransitions?"none":r.data("dx-transition");return{destination:r,source:o.find(f(e)),type:s||"none",direction:u._getDirection(i)}}),e=n.Deferred(),setTimeout(function(){u._executeTransitions(s).done(function(){u._changeView(t),e.resolve()})}),e.promise()):(u._changeView(t),n.Deferred().resolve().promise())},_equalLayouts:function(t,i){var e=t.find(r),o=i.find(r),u;return e.length!==o.length?!1:(u=!0,e.each(function(){var t=n(this).data("dx-placeholder");if(o.filter(f(t)).length!==1){u=!1;return}}),u)},_changeView:function(n){var i=n.renderResult.$markup;t.framework.html.utils.removeFromViewPort(this.$viewPort.children()),this.$viewPort.append(i),this._updateNavigationSelectedItem(n),i.show()},_updateNavigationSelectedItem:function(){},_executeTransitions:function(t){var i=this,r=n.grep(t,function(n){return n.type!=="none"}),u=n.map(r,n.proxy(i._executeTransition,i));return n.when.apply(n,u)},_executeTransition:function(n){var i=t.framework.html.TransitionExecutor.create(this.$viewPort,n.type);return i.exec(n)}}),n(function(){t.framework.html.layoutControllers.empty=new t.framework.html.DefaultLayoutController})}(jQuery,DevExpress),function(n,t){var r=t.Class;t.framework.html.KnockoutJSTemplateEngine=r.inherit({ctor:function(n){this.navigationManager=n.navigationManager},applyTemplate:function(n,t){ko.applyBindings(t,n)}})}(jQuery,DevExpress),function(n,t){var r=t.Class;t.framework.html.ViewEngine=r.inherit({ctor:function(t){t=t||{},this.$root=t.$root,this.device=t.device||{},this.templateEngine=t.templateEngine,this.commandManager=t.commandManager,this._defaultLayout=t.defaultLayout||"empty",this._templateMap={},this._pendingViewContainer=null,this.viewSelecting=n.Callbacks(),this.layoutSelecting=n.Callbacks(),this.modelFromViewDataExtended=n.Callbacks(),this.layoutApplying=n.Callbacks(),this.layoutApplied=n.Callbacks()},init:function(){return this._loadTemplates()},_findTemplate:function(t,i){var u=this,f,e=n.grep(this._templateMap[t]||[],function(n){return n.data("dx-role")===i}),r;if(!e.length)throw new Error("Error 404: Template not found. role:  "+i+", name: "+t);return r=-1,n.each(e,function(t,i){var e=0;n.each(u.device,function(n){var t=i.data("dx-"+n);t===u.device[n]&&e++}),e>r&&(r=e,f=i)}),f.clone(!0,!0)},_viewSelecting:function(t){var i={viewName:t};return this.viewSelecting.fire(i),i.view?n(i.view):this._findTemplate(t,"view")},_layoutSelecting:function(t){var i={layoutName:t};return this.layoutSelecting.fire(i),i.layout?n(i.layout):this._findTemplate(t,"layout")},_extendModelFromViewData:function(n,i){t.utils.extendFromDataAttributes(n,i),this.modelFromViewDataExtended.fire({view:n,model:i})},_loadTemplatesFromMarkup:function(t){var i=this;n(["view","layout"]).each(function(r,u){t.filter("[data-dx-role='"+u+"']").each(function(t,r){var u=n(r),f=u.data("dx-name"),e=i._templateMap[f]||[];e.push(u),i._templateMap[f]=e,u.detach()})})},_applyLayout:function(t,i){var r={$view:t,$layout:i},u;return this.layoutApplying.fire(r),u=r.$markup?n(r.$markup):this._applyLayoutCore(t,i),this.layoutApplied.fire({$markup:u}),u},_applyLayoutCore:function(t,i){var r=n().add(t).add(i);return n.each(r.children("*[data-dx-target-placeholder]"),function(){var t=n(this),i=t.data("dx-target-placeholder");r.find("*[data-dx-placeholder='"+i+"']").append(t)}),i},_applyPartialViews:function(t){var i=this;n.each(t.find("*[data-dx-render-partial]"),function(){var r=n(this),u=r.data("dx-render-partial"),t=i._findTemplate(u,"view").clone();i._applyPartialViews(t),r.append(t),t.show()})},_createMarkupFromString:function(t){var i=document.createElement("div");return window.WinJS?WinJS.Utilities.setInnerHTMLUnsafe(i,t):i.innerHTML=t,n(i).contents()},_ajaxImpl:function(){return n.ajax.apply(n,arguments)},_loadTemplates:function(){var t=this,i;return this._templateMap={},this._loadTemplatesFromMarkup(this.$root.children()),i=[],n("head").find("link[rel='dx-template']").each(function(r,u){var f=n(u).attr("href"),e=t._ajaxImpl({url:f,success:function(n){t._loadTemplatesFromMarkup(t._createMarkupFromString(n))},dataType:"html"});i.push(e)}),n.when.apply(n,i)},afterViewSetup:function(n){var t=this._viewSelecting(n.viewName);this._extendModelFormViewTemplate(t,n.model)},_extendModelFormViewTemplate:function(n,t){this._extendModelFromViewData(n,t);var i=t.commands=t.commands||[],r=this.commandManager.createCommands(n,t);i.push.apply(i,r)},_renderViewTemplate:function(n,i,r){i=i||{};var e=n.data("dx-layout")||this._defaultLayout,f=this._layoutSelecting(e),u=this._applyLayout(n,f);return this._applyPartialViews(u),u.appendTo(r),u.show(),this.templateEngine.applyTemplate(u.get(0),i),this.commandManager.layoutCommands(u,i.commands),u.hide(),t.framework.html.utils.removeFromViewPort(u),{$markup:u,layoutControllerName:f.data("dx-controller")}},renderView:function(n,t){var i=this._viewSelecting(n.viewName);return this._renderViewTemplate(i,n.model,t)}})}(jQuery,DevExpress),function(n,t){var u=t.framework,r=u.html;r.HtmlApplication=u.Application.inherit({ctor:function(i){this.callBase(i),this._initViewPort(i.viewPort);var u=window.sessionStorage&&sessionStorage.getItem("dx-simulator-device");if(this.device=i.device||t.devices.getDevice(u),this._$root=n(i.rootNode||document.body),i.viewPortNode===document.body)throw Error("Do not pass document body as a value of the viewPortNode option. If you don't have a special view port node then do not specify it.");this._$viewPort=i.viewPortNode?n(i.viewPortNode):n("<div id='__view-port' style='height: 100%; width: 100%'><\/div>").appendTo(n("body")),this.viewEngine=i.viewEngine||new r.ViewEngine({$root:this._$root,device:this.device,defaultLayout:i.defaultLayout,templateEngine:i.templateEngine||new r.KnockoutJSTemplateEngine({navigationManager:this.navigationManager}),commandManager:i.commandManager||new r.CommandManager({globalCommands:this.navigation})}),this.components.push(this.viewEngine),this.viewRendered=n.Callbacks(),this._initLayoutControllers(),this._applyCssTheme(i)},viewPort:function(){return this._$viewPort},_initViewPort:function(i){var i=i||{};t.devices.getDevice().platform==="desktop"&&(i=n.extend({disabled:!0},i)),i.disabled||t.ui.initViewport(i)},_applyCssTheme:function(t){var i=this,r=t.themeClasses||this._getThemeClasses(this.device);n(function(){i._$viewPort.addClass(r)})},_getThemeClasses:function(n){var i={ios:"dx-theme-ios dx-theme-ios-typography",android:"dx-theme-android dx-theme-android-typography",desktop:"dx-theme-desktop dx-theme-desktop-typography",win8:"dx-theme-win8 dx-theme-win8-typography",win8phone:"dx-theme-win8phone dx-theme-win8phone-typography"},t=n.platform;return n.platform==="win8"&&(t=n.platform+(n.phone?"phone":"")),i[t]},_initLayoutControllers:function(){var t=this;n.each(r.layoutControllers,function(n,i){i.init&&i.init({app:t,$viewPort:t._$viewPort,navigationManager:t.navigationManager})})},_afterCreateViewModel:function(n){this.callBase(n),this.viewEngine.afterCreateViewModel&&this.viewEngine.afterCreateViewModel(n)},_setCurrentViewAsyncImpl:function(n,t){return this._ensureRendered(n),this._showRenderedView(n,t)},_showRenderedView:function(i,u){var e=i.renderResult.layoutControllerName||"empty",o=r.layoutControllers[e],f=new n.Deferred;return t.enqueue(function(){return o.showView(i,u).done(function(){f.resolve()})}),f.promise()},_ensureRendered:function(n){var i,t;n.renderResult||(i=this.viewEngine.renderView(n,this._$viewPort),n.renderResult=i,this._processEvent("viewRendered",n),t=n.model.viewRendered,t&&t.call(n.model,n))}})}(jQuery,DevExpress),function(n,t){var r=400,i=t.Class.inherit({ctor:function(n){this.container=n},exec:function(t){var i=this,f=t.source,u=t.destination,e=i._createWrapperProps(u),r=i._wrapElementContent(f,e),o=i._wrapElementContent(u,e),s=i._getElementDomLocation(r);return r.insertAfter(o),i._animate(n.extend({},t,{source:r,destination:o})).done(function(){i._restoreElementDomLocation(r,s),i._unwrapElement(u),i._unwrapElement(f)})},_getElementProps:function(i){var r={};return r.style=i.attr("style")||"",n.each(["position","top","left"],function(n,u){r[u]=t.fx.getProp(i,u)}),r},_createWrapperProps:function(n){return{position:"absolute",top:0,left:t.fx.getProp(n,"left"),width:n.outerWidth(!0),height:n.outerHeight(!0)}},_wrapElementContent:function(t,i){var r=n("<div />").css(i).css({position:"relative"}),u;return t.wrapInner(r),r=t.children().eq(0),u=n("<div />").css(i),r.wrapInner(u),r.children().eq(0)},_unwrapElement:function(n){var t=n.children().eq(0),i=t.children().eq(0);i.children().eq(0).unwrap().unwrap()},_getElementDomLocation:function(n){return{$parent:n.parent()}},_restoreElementDomLocation:function(n,t){var i=t.$parent;i.append(n)},_animate:function(){return(new n.Deferred).resolve().promise()}}),u=i.inherit({_animate:function(n){var s=this,o=n.source,f=n.destination,i=this.container.width(),u=t.fx.getProp(f,"left"),e;return n.direction==="backward"&&(i=-i),e=t.fx.animate([{$element:o,from:{left:i+u},to:{left:u}},{$element:f,from:{left:u},to:{left:u-i}}],{duration:r})}}),f=i.inherit({_animate:function(n){var u=n.source,f=n.destination,s=f.position().top,i=f.position().left,e=this.container.width(),o;return n.direction==="backward"&&(e=-e),t.fx.transform(u,{top:s,left:e+i}),n.direction==="forward"?o=[{$element:u,to:{left:i}}]:(t.fx.transform(u,{left:i,"z-index":1}),t.fx.transform(f,{"z-index":2}),o=[{$element:u,to:{left:i}},{$element:f,to:{left:-e+i}}]),t.fx.animate(o,{duration:r})}}),e=i.inherit({_animate:function(t){var i=t.source,f=t.destination,u=new n.Deferred;return i.css({opacity:0}),f.animate({opacity:0},r),i.animate({opacity:1},r,function(){u.resolve()}),u.promise()}});i.create=function(n,t){switch(t){case"slide":return new u(n);case"fade":return new e(n);case"overflow":return new f(n);default:throw Error('Unknown transition type "'+t+'"');}},t.framework.html.TransitionExecutor=i}(jQuery,DevExpress);