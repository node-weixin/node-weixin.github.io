"use strict";angular.module("wwwApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/intro",{templateUrl:"views/intro.html",controller:"IntroCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/forum",{templateUrl:"views/forum.html",controller:"ForumCtrl",controllerAs:"forum"}).when("/download/tool",{templateUrl:"views/download.html",controller:"MainCtrl",controllerAs:"forum"}).otherwise({redirectTo:"/"})}]),angular.module("wwwApp").controller("MainCtrl",["$scope","projects","express",function(a,b,c){a.projects=b.data,a.express=c.data,$(".nav > li").removeClass("active"),$(".nav > li.home").addClass("active")}]),angular.module("wwwApp").controller("IntroCtrl",["$scope","projects","express",function(a,b,c){a.projects=b.data,a.express=c.data,$(".nav > li").removeClass("active"),$(".nav > li.home").addClass("active")}]),angular.module("wwwApp").controller("AboutCtrl",function(){}),angular.module("wwwApp").service("projects",function(){return{data:[{name:"config",title:"用于微信配置信息的校验",desc:""},{name:"auth",title:"用于与微信服务器握手检验",desc:""},{name:"oauth",title:"用于微信的OAuth相关操作",desc:""},{name:"util",title:"一些常用的微信请求，加密，解密，检验的功能与处理",desc:""},{name:"request",title:"微信的各类服务的HTTP请求的抽象集合",desc:""},{name:"pay",title:"微信支付的服务器接口",desc:""},{name:"jssdk",title:"微信JSSDK相关的服务器接口",desc:""},{name:"menu",title:"微信菜单相关的操作与命令",desc:""},{name:"user",title:"微信用户API",desc:""},{name:"media",title:"微信多媒体API",desc:""},{name:"link",title:"微信推广(二维码,URL)API",desc:""},{name:"message",title:"微信消息API",desc:""}]}}),angular.module("wwwApp").service("express",function(){return{data:[{name:"session",title:"用于保存与req相关的数据",desc:""},{name:"settings",title:"用于保存与appId相关的配置数据与中间数据",desc:""}]}}),angular.module("wwwApp").controller("ProjectsCtrl",["$scope","projects",function(a,b){a.projects=b.data}]),angular.module("wwwApp").service("forum",["$http",function(a){var b="http://forum.node-weixin.com/api/v1/topics";return{get:function(c){a({url:b,method:"GET",data:{page:1,limit:20,tab:"",mdrender:!1},useXDomain:!0,withCredentials:!0}).then(c)}}}]),angular.module("wwwApp").filter("ios",function(){return function(a,b,c){var d=new Date(a);switch(c=c||"Asia/Shanghai",moment.locale("zh-CN"),b){case"arrival":var e=new Date,f=moment(d).tz(c).format("YYYY-MM-DD"),g=moment(e).tz(c).format("YYYY-MM-DD");return f===g?"今天"+moment(d).tz(c).format(" hh:mm"):moment(d).tz(c).format("DD日 hh:mm");case"status":return moment(d).tz(c).format("MM月DD日 hh:mm");case"week":return moment(d).tz(c).format("YYYY年MM月DD日 dd hh:mm");default:return moment(d).tz(c).format("YYYY-MM-DD hh:mm:ss")}}}),angular.module("wwwApp").controller("ForumCtrl",["$scope","$rootScope","forum",function(a,b,c){$(".nav > li").removeClass("active"),$(".nav > li.forum").addClass("active"),c.get(function(b){a.posts=b.data.data})}]),angular.module("wwwApp").filter("tag",function(){return function(a){var b={water:"其它",share:"分享",question:"问题",projects:"项目",good:"精华"};return b[a]}}),angular.module("wwwApp").run(["$templateCache",function(a){a.put("views/download.html",'<div ng-include="\'views/header.html\'"></div> <div class="jumbotron webtool"> <h1>微信Web开发工具</h1> <h5>ver（0.3.0）</h5> <div class="container-fluid info"> <div class="row text-center"> <div class="col-md-6 div"> <div> <div class="left"> <i class="fa fa-windows"></i> </div> <div class="right contianer-fluid"> <div class="row text-center"> <div class="col-md-6 div"> <h1>32bit</h1> <h1><a href="https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/download?from=mpwiki&os=x86"><i class="fa fa-download"></i></a></h1> </div> <div class="col-md-6 div"> <h1>64bit</h1> <h1><a href="https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/download?from=mpwiki&os=x64"><i class="fa fa-download"></i></a></h1> </div> </div> </div> </div> </div> <div class="col-md-6 div"> <div> <div class="left"> <i class="fa fa-apple"></i> </div> <div class="right contianer-fluid"> <div class="row text-center"> <div class="col-md-12 div"> <h1>通用版本</h1> <h1><a href="https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/download?from=mpwiki&os=darwin"><i class="fa fa-download"></i></a></h1> </div> </div> </div> </div> </div> </div> </div> </div>'),a.put("views/forum.html",'<div ng-include="\'views/header.html\'"></div> <div class="container-fluid"> <div class="row text-left marketing"> <div class="col-md-12"> <h3 class="forum"> <span>微信论坛</span> <a class="label label-danger pull-right" href="http://forum.node-weixin.com/"> <span>+</span>我要提问</a> </h3> <div class="media post" ng-repeat="post in posts"> <div class="media-left"> <a href="http://forum.node-weixin.com/user/{{post.author.loginname}}"> <img class="media-object" ng-src="{{post.author.avatar_url}}" ng-alt="{{post.author.loginname}}"> </a> </div> <div class="media-body"> <h4> <a class="title" href="http://forum.node-weixin.com/topic/{{post.id}}">{{post.title}}</a> <br> <a href="#/forum/tag/{{post.tab}}"><span class="label label-default">{{post.tab | tag}}</span></a> <span class="label label-info">访问: {{post.visit_count}}</span> <span class="label label-warning">评论: {{post.reply_count}}</span> <a href="#/forum/user/{{post.author_id}}"><span class="label label-success">{{post.author.loginname}}</span></a> <!-- <span class="label label-default">{{post.create_at | ios:\'arrival\'}}</span> --> <!-- <span class="label label-danger">最后回复:</span> --> <span class="label label-default pull-right">{{post.create_at | ios:\'arrival\'}}</span> </h4> </div> </div> </div> </div> </div>'),a.put("views/header.html",'<nav class="navbar navbar-default"> <div class="container-fluid nav"> <!-- Brand and toggle get grouped for better mobile display --> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse" aria-expanded="false"> <span class="sr-only"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" style="color: #03a9f4"><i class="fa fa-wechat"></i></a> </div> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <ul class="nav navbar-nav"> <li class="home"> <a href="#/">首页</a> </li> <!--\n        <li>\n          <a href="#/api">API</a>\n        </li>--> <li> <a id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> 开发文档 <span class="caret"></span> </a> <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"> <li><a href="https://mp.weixin.qq.com/wiki/home" target="_blank">官方公共平台</a></li> <li><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN" target="_blank">官方公共平台（新）</a></li> <li><a href="https://pay.weixin.qq.com/wiki/doc/api/index.html" target="_blank">官方微信支付</a></li> <!--<li role="separator" class="divider"></li>\n\n            <li><a>api参考</a></li>\n            <li><a>使用指南</a></li>\n            <li>\n              <a href="#"></a>\n            </li>--> </ul> </li> <li> <a id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> 下载 <span class="caret"></span> </a> <ul class="dropdown-menu" aria-labelledby="dropdownMenu2"> <li><a href="#/download/tool">微信web开发者工具</a></li> <!--<li role="separator" class="divider"></li>--> </ul> </li> <li class="forum"> <a id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> 官网开发链接 <span class="caret"></span> </a> <ul class="dropdown-menu" aria-labelledby="dropdownMenu2"> <li> <a target="_blank" href="http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login">公共帐号测试</a> </li> <li> </li> <li><a target="_blank" href="http://mp.weixin.qq.com/debug">接口调试</a></li> <li> <a href="#"></a> </li> </ul> </li> <li> <a href="http://www.tianyikuai.com/">培训</a> </li> <li class="forum"> <a target="_blank" href="http://forum.node-weixin.com/">论坛</a> </li> </ul> </div> <!-- /.navbar-collapse --> </div> <!-- /.container-fluid --> </nav>'),a.put("views/intro.html",'<div ng-include="\'views/header.html\'"></div> <div class="container-fluid"> <div class="row text-left marketing"> <div class="col-md-6"> <div class="theme-box"> <h3> <code>node-weixin</code>项目是一个 <code>开源</code>的基于 <code>nodejs</code>的 <code>微信</code>项目</h3> <p>它旨在实现：</p> <ol> <li>一个代码精良的api库,即微信SDK(<a href="https://github.com/node-weixin/node-weixin-api">node-weixin-api</a>) <ul> <li>基本的公共帐号api(auth, message,菜单)</li> <li>支付,OAuth卡券,小店,IOT等其它API</li> <li>相关的微信工具(Setting,http请求,配置)<br></li> </ul> </li> <li>一个可以直接运行的服务器(<a href="https://github.com/node-weixin/node-weixin-express">node-weixin-express</a>) <ul> <li>方便后端人员了解api的组建流程</li> <li>同时也方便前端人员快速开展微信的开发工具,不必了解后端的具体实现。</li> <li>提供后台</li> <li>提供移动端测试页面</li> <li>提供插件机制</li> </ul> </li> </ol> </div> </div> <div class="col-md-6"> <div class="text-center architect" style="margin-top: 10px; height"> <img src="images/node-weixin.9bef661c.png" width="100%" style="box-shadow: 1px 1px 1px 1px #ccc;border-radius:5px"> </div> </div> </div> <div class="row marketing"> <div class="col-md-6"> <h3 class="pay"> <a href="https://github.com/node-weixin/node-weixin-express"> <span class="label label-default">node-weixin-express</span> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/stars/node-weixin/node-weixin-express.svg?style=social&label=Star"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/forks/node-weixin/node-weixin-express.svg?style=social&label=Fork"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/watchers/node-weixin/node-weixin-express.svg?style=social&label=Watch"> </a> <button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#weixinpay"> <img ng-src="/images/weixinpay.7a4636fb.png" style="height:16px">&nbsp;支持下作者</button> </h3> <p>是以expressjs作为首选http服务器框架的微信公共账号服务器。</p> <p>由于采用分层结构，可以很方便的扩展到其它服务器。</p> <p>旨在降低使用nodejs开发微信公共账号时的门槛，节约开发时间。</p> <p>几个主要目标： <ol> <li> 可以直接通过一个命令运行微信公共账号服务(已经完成) <br> 实现基本的微信服务器功能： <br> <ul> <li> 验证服务器(完成) </li> <li> OAuth 验证API(完成) </li> <li> 微信支付API(完成) </li> <li> 消息接口API(完成) </li> </ul> </li> <li> 可以任意基于expressjs的框架沟通协作（已经完成,通过 <a href="https://github.com/node-weixin/node-weixin-router"> <span class="label label-info">node-weixin-router</span> </a>) </li> <li> 模块化机制采用Unix开发哲学：KISS </li> <li> 建立一个可以方便安装数据库，并且将配置信息存放在数据库里的机制. <br> 目前已经完成了 <ul> <li> <a href="https://github.com/node-weixin/node-weixin-session"> <span class="label label-success">node-weixin-session</span> </a> <br> </li> <li> <a href="https://github.com/node-weixin/node-weixin-settings"> <span class="label label-success">node-weixin-settings</span> </a> <br> </li> </ul> 可以很方便的添加各类数据库机制 </li> <li> 通过 <a href="https://github.com/node-weixin/node-weixin-express"> <span class="label label-info">node-weixin-express</span> </a> 可以无需任何开发就可以自己建设一个功能全面的微信服务器(完全服务器部分的功能已经完成) </li> </ol> </p> <p>几个重要的模块： </p> <ul> <li ng-repeat="project in express"><a href="https://github.com/node-weixin/node-weixin-{{project.name}}">node-weixin-{{project.name}}</a> <br> {{project.title}} </li> </ul> </div> <div class="col-md-6"> <h3 class="pay"> <a href="https://github.com/node-weixin/node-weixin-api"> <span class="label label-default">node-weixin-api</span> </a> <a href="https://github.com/node-weixin/node-weixin-api"> <img ng-src="https://img.shields.io/github/stars/node-weixin/node-weixin-api.svg?style=social&label=Star"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/forks/node-weixin/node-weixin-api.svg?style=social&label=Fork"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/watchers/node-weixin/node-weixin-api.svg?style=social&label=Watch"> </a> <button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#weixinpay"> <img ng-src="/images/weixinpay.7a4636fb.png" style="height:16px">&nbsp;支持下作者</button> </h3> <p>已经相对比较成熟，可以支持常用的weixin api.详细情况可以参考项目列表</p> <ul> node-weixin-api的基础支持项目如下： <li ng-repeat="project in projects"><a href="https://github.com/node-weixin/node-weixin-{{project.name}}">node-weixin-{{project.name}}</a> <br> {{project.title}} </li> </ul> </div> </div> </div>'),a.put("views/main.html",'<div ng-include="\'views/header.html\'"></div> <div class="jumbotron"> <h1 class="name">Node Weixin</h1> <h1>一个优雅的微信开源SDK实现</h1> <br> <div class="command"> <span> npm install --save node-weixin-api </span> <a class="pointer" href="https://github.com/node-weixin/node-weixin-api" target="_blank"> 开发模式 <i class="fa fa-caret-right"></i> </a> </div> <br> <div class="command"> <span> npm install -g node-weixin-express </span> <a class="pointer" href="https://github.com/node-weixin/node-weixin-express" target="_blank"> 演示模式 <i class="fa fa-caret-right"></i> </a> </div> <div class="container"> <div class="row"> <div class="col-md-6"> <h3 class="pay"> <a href="https://github.com/node-weixin/node-weixin-express" target="_blank"> <span class="label">node-weixin-express</span> </a> <br> <br> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/stars/node-weixin/node-weixin-express.svg?style=social&label=Star"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/forks/node-weixin/node-weixin-express.svg?style=social&label=Fork"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/watchers/node-weixin/node-weixin-express.svg?style=social&label=Watch"> </a> <button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#weixinpay"> <img ng-src="/images/weixinpay.7a4636fb.png" style="height:16px">&nbsp;支持下作者</button> </h3> <a target="_blank" class="btn btn-lg weixin-btn" href="https://github.com/node-weixin/node-weixin-express">开始使用</a> </div> <div class="col-md-6"> <h3 class="pay"> <a href="https://github.com/node-weixin/node-weixin-api"> <span class="label">node-weixin-api</span> </a> <br> <br> <a href="https://github.com/node-weixin/node-weixin-api"> <img ng-src="https://img.shields.io/github/stars/node-weixin/node-weixin-api.svg?style=social&label=Star"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/forks/node-weixin/node-weixin-api.svg?style=social&label=Fork"> </a> <a href="https://github.com/node-weixin/node-weixin-express"> <img ng-src="https://img.shields.io/github/watchers/node-weixin/node-weixin-api.svg?style=social&label=Watch"> </a> <button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#weixinpay"> <img ng-src="/images/weixinpay.7a4636fb.png" style="height:16px">&nbsp;支持下作者</button> </h3> <a target="_blank" class="btn btn-lg weixin-btn" href="https://github.com/node-weixin/node-weixin-api">开始使用</a> </div> </div> </div> </div> <div class="container-fluid info"> <div class="row text-center"> <div class="col-md-6 div div-color-1"> <div> <div class="left"> <i class="fa fa-terminal"></i> </div> <div class="right"> <h1>快速体验</h1> <p>可以通过命令行快速的安装，运行，体验，测试 </p><p> </p></div> </div> </div> <div class="col-md-6 div div-color-2"> <div> <div class="left"> <i class="fa fa-sitemap"></i> </div> <div class="right"> <h1>优雅的架构</h1> <p>根据业务关系分类组织，可以独立使用，也可以组合使用</p> </div> </div> </div> </div> <div class="row text-center"> <div class="col-md-6 div div-color-3"> <div> <div class="left"> <i class="fa fa-html5"></i> </div> <div class="right"> <h1>方便前端调试</h1> <p>前端可以快速基于node-weixin-express进行开发调试 </p> </div> </div> </div> <div class="col-md-6 div div-color-4"> <div> <div class="left"> <i class="fa fa-gear"></i> </div> <div class="right"> <h1>工业级的代码质量</h1> <p>代码测试非常充分，并经过了线上项目的考验</p> </div> </div> </div> </div> </div> <div class="container-fluid intro"> <div class="row text-center"> <div class="col-md-12 div"> <a class="btn btn-lg" href="#/intro" style="background-color:#2d0f64;color: #FFF"> 了解更多 &raquo; </a> </div> </div> </div>'),a.put("views/modal.html",'<!-- Modal --> <div class="modal fade" id="weixinpay" tabindex="-1" role="dialog" aria-labelledby="weixinpay"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">扫一扫支持作者</h4> </div> <div class="modal-body"> <p class="text-center pay"><img src="/images/qrcode.2dbe53bd.jpg"></p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">确定</button> </div> </div> </div> </div>')}]);