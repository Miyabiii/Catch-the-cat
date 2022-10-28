import"./phaser.ab1129a2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();class F extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(11786751),this.createLoadingbar(),this.load.on("progress",function(t){this.progressBar.clear(),this.progressBar.fillStyle(3840473,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*t,16)},this),this.load.on("complete",function(){this.progressBar.destroy(),this.loadingBar.destroy()},this),this.load.pack("pack1","./assets/pack.json","cat"),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("StartScene")}createLoadingbar(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,2),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class B extends Phaser.GameObjects.Arc{constructor(t,e,s,i){let r=t.getPosition(e,s);super(t,r.x,r.y,i,0,360,!1,0,1),this.i=e,this.j=s,this.r=i;let a=new Phaser.Geom.Circle(this.r/2,this.r/2,this.r);this.setInteractive(a,Phaser.Geom.Circle.Contains),this.on("pointerdown",()=>{this.emit("player_click",this.i,this.j)}),this.isWall=!1,this.scene.add.existing(this)}get isWall(){return this.m_isWall}set isWall(t){this.m_isWall=t,t?this.fillColor=13158:this.fillColor=11786751}}const n={myconfig:{w:11,h:11,r:20,backgroundColor:16777215,parent:"game",statusBarAlign:"center",credit:"2040622105 \u9F9A\u8BD7\u96C5"},animations:[{name:"left_step",textures:["L01","L02","L03","L04","L05"],repeat:0},{name:"top_left_step",textures:["TL01","TL02","TL03","TL04","TL05"],repeat:0},{name:"bottom_left_step",textures:["BL01","BL02","BL03","BL04","BL05"],repeat:0},{name:"left_run",textures:["L02","L03","L04","L05"],repeat:3},{name:"top_left_run",textures:["TL02","TL03","TL04","TL05"],repeat:3},{name:"bottom_left_run",textures:["BL02","BL03","BL04","BL05"],repeat:3}],origins:{left:{x:.75,y:.75},top_left:{x:.63,y:.83},bottom_left:{x:.65,y:.5}},stopTextures:{left:"L01",top_left:"TL01",bottom_left:"BL01"},cannotEscapeTextures:{left:"L02",top_left:"TL02",bottom_left:"BL02"},directions:[{scaleX:1,name:"left"},{scaleX:1,name:"top_left"},{scaleX:-1,name:"top_left"},{scaleX:-1,name:"left"},{scaleX:-1,name:"bottom_left"},{scaleX:1,name:"bottom_left"}],catDefaultDirection:5,catStepLength:20,frameRate:15};class x{constructor(t,e,s,i){this.i=e,this.j=s,this.isWall=i,this.distance=1/0,this.parent=t,this.isEdge=this.i<=0||this.i>=this.parent.w-1||this.j<=0||this.j>=this.parent.h-1}get routesCount(){if(this._routesCount===void 0)if(this.isEdge)this._routesCount=1;else{let t=0;this.neighbours.forEach(e=>{e!==null&&!e.isWall&&e.distance<this.distance&&(t+=e.routesCount)}),this._routesCount=t}return this._routesCount}get neighbours(){if(this._neighbours===void 0){let t=p.getNeighbours(this.i,this.j);this._neighbours=t.map(e=>this.parent.getCell(e.i,e.j))}return this._neighbours}get directions(){let t=[];return this.neighbours.forEach((e,s)=>{e!==null&&!e.isWall&&e.distance<this.distance&&t.push(s)}),t}get direction(){let t=0,e=-1;return this.directions.forEach(s=>{let i=this.neighbours[s];i.routesCount>t&&(t=i.routesCount,e=s)}),e}}class C{constructor(t){if(this.w=t.length,this.w<=0)throw new Error("empty colums");this.h=t[0].length,this.cells=t.map((e,s)=>e.map((i,r)=>new x(this,s,r,t[s][r])))}getCell(t,e){return t>=0&&t<this.w&&e>=0&&e<this.h?this.cells[t][e]:null}BFS(){let t=[];for(this.cells.forEach(e=>{e.forEach(s=>{s._routesCount=void 0,s.isEdge&&!s.isWall&&(s.distance=0,t.push(s))})});t.length>0;){let e=t.shift();e.neighbours.forEach(s=>{s!==null&&!s.isEdge&&!s.isWall&&s.distance>e.distance+1&&(s.distance=e.distance+1,t.indexOf(s)<0&&t.push(s))})}console.log(this.toString())}toString(){let t=[];for(let e=0;e<this.h;e++){let s=[];for(let r=0;r<this.w;r++){let a=this.getCell(r,e);a.isWall?s.push("*"):s.push(a.routesCount)}let i=s.join(" ");(e&1)===1&&(i=" "+i),t.push(i)}return t.join(`
`)}}function y(u,t,e){let s=new C(u);return s.BFS(),s.getCell(t,e).direction}class b extends Phaser.GameObjects.Sprite{constructor(t){super(t,0,0,"L01"),this.on("animationrepeat",()=>{this.moveForward()}),this.main=t,this.solver=y,this.direction=n.catDefaultDirection,this.scene.add.existing(this)}get i(){return this.getData("i")}set i(t){this.setData("i",t)}get j(){return this.getData("j")}set j(t){this.setData("j",t)}get direction(){return this.getData("direction")}set direction(t){this.setData("direction",t),this.resetTextureToStop(),this.resetOriginAndScale()}get solver(){return this.getData("solver")}set solver(t){this.setData("solver",t)}reset(){this.anims.stop(),this.direction=n.catDefaultDirection,this.resetIJ()}step(){let t=this.solver.call(this,this.main.blocksData,this.i,this.j);return t<0||t>6?(this.caught(),!1):this.stepDirection(t)?!0:(this.caught(),!1)}isCaught(){return!this.getCurrentNeighbours().some((t,e)=>{let s=this.main.getBlock(t.i,t.j);return s!==null&&!s.isWall})}caught(){this.setTexture(n.cannotEscapeTextures[n.directions[this.direction].name])}escape(){this.j===0||this.j===this.main.h-1?this.runForward():this.i===0?this.runDirection(0):this.i===this.main.w-1&&this.runDirection(3)}setIJ(t,e){this.i=t,this.j=e;let{x:s,y:i}=this.main.getPosition(t,e);return this.setPosition(s,i)}resetIJ(){this.setIJ(Math.floor(this.main.w/2),Math.floor(this.main.h/2))}isEscaped(){return this.i<=0||this.i>=this.main.w-1||this.j<=0||this.j>=this.main.h-1}checkState(){this.isEscaped()?(this.escape(),this.emit("escaped")):this.isCaught()&&(this.caught(),this.emit("win"))}getCurrentNeighbours(){return p.getNeighbours(this.i,this.j)}resetTextureToStop(){this.setTexture(n.stopTextures[n.directions[this.direction].name])}resetOriginAndScale(){let t=n.directions[this.direction],e=n.origins[t.name];this.setOrigin(e.x,e.y),this.scaleX=t.scaleX}moveForward(){let t=this.getCurrentNeighbours()[this.direction];this.setIJ(t.i,t.j),this.checkState()}stepForward(){let t=this.getCurrentNeighbours()[this.direction],e=this.main.getBlock(t.i,t.j);return e===null||e.isWall?!1:(this.play(n.directions[this.direction].name+"_step"),this.once("animationcomplete",()=>{this.moveForward(),this.resetTextureToStop()}),!0)}stepDirection(t){return this.direction=t,this.stepForward()}runForward(){this.play(n.directions[this.direction].name+"_run")}runDirection(t){this.direction=t,this.runForward()}}class E extends Phaser.GameObjects.Text{constructor(t){super(t,0,0,"",{}),this.setColor("#000000"),this.setPosition(t.game.canvas.width,t.game.canvas.height),this.setOrigin(1,1);let e=30;this.setFontSize(e*.8),this.setPadding(e,e,e,e),this.setText(n.myconfig.credit),this.scene.add.existing(this)}}class w extends Phaser.GameObjects.Text{constructor(t){super(t,0,0,"",{}),this.setColor("#000000");let e=t.r;this.setFontSize(e),this.setX(t.game.canvas.width/2),this.setOrigin(.5,0),this.setPadding(e,e,e,e),this.scene.add.existing(this)}}class S extends Phaser.GameObjects.Text{constructor(t){super(t,0,0,"\u91CD\u7F6E",{}),this.setColor("#000000");let e=t.r;this.setFontSize(e),this.setPadding(e,e,e,e),this.setPosition(0,t.game.canvas.height),this.setOrigin(0,1);let s=new Phaser.Geom.Rectangle(0,0,this.width,this.height);this.setInteractive(s,Phaser.Geom.Rectangle.Contains),this.scene.add.existing(this)}}var m,g,c,d,f;class p extends Phaser.Scene{constructor(t,e,s){super({key:"PlayScene"}),this.w=t,this.h=e,this.r=s,this.dx=this.r*2,this.dy=this.r*Math.sqrt(3)}init(){console.log("init")}get cat(){return this.data.get("cat")}set cat(t){this.data.set("cat",t)}get statusBar(){return this.data.get("status_bar")}set statusBar(t){this.data.set("status_bar",t)}get creditText(){return this.data.get("credit_text")}set creditText(t){this.data.set("credit_text",t)}get state(){return this.data.get("state")}set state(t){switch(t){case"playing":break;case"lose":this.setStatusText("\u732B\u5DF2\u7ECF\u8DD1\u5230\u5730\u56FE\u8FB9\u7F18\u4E86\uFF0C\u4F60\u8F93\u4E86"),this.cat.scene.time.delayedCall(2e3,()=>{this.setStatusText("\u70B9\u51FB\u4EFB\u610F\u4F4D\u7F6E\u91CD\u65B0\u5F00\u59CB")});break;case"win":this.setStatusText("\u732B\u5DF2\u7ECF\u65E0\u8DEF\u53EF\u8D70\uFF0C\u4F60\u8D62\u4E86"),this.cat.scene.time.delayedCall(2e3,()=>{this.setStatusText("\u70B9\u51FB\u4EFB\u610F\u4F4D\u7F6E\u91CD\u65B0\u5F00\u59CB")});break;case"time_out":this.setStatusText("\u5012\u8BA1\u65F6\u7ED3\u675F\uFF0C\u4F60\u8F93\u4E86"),this.cat.scene.time.delayedCall(2e3,()=>{this.setStatusText("\u70B9\u51FB\u4EFB\u610F\u4F4D\u7F6E\u91CD\u65B0\u5F00\u59CB")});break;default:return}this.data.set("state",t)}static getNeighbours(t,e){let s={i:t-1,j:e},i={i:t+1,j:e},r,a,l,h;(e&1)===0?(r={i:t-1,j:e-1},a={i:t,j:e-1},l={i:t-1,j:e+1},h={i:t,j:e+1}):(r={i:t,j:e-1},a={i:t+1,j:e-1},l={i:t,j:e+1},h={i:t+1,j:e+1});let o=[];return o[0]=s,o[1]=r,o[2]=a,o[3]=i,o[4]=h,o[5]=l,o}reset(){this.cat.reset(),this.resetBlocks(),this.state="playing",this.time.addEvent(d),this.setStatusText("\u70B9\u51FB\u5C0F\u5706\u70B9\uFF0C\u56F4\u4F4F\u5C0F\u732B")}playerClick(t,e){if(this.sound.add("block_sound").play(),this.cat.anims.isPlaying&&this.cat.anims.stop(),this.state!=="playing")return this.setStatusText("\u6E38\u620F\u5DF2\u7ECF\u7ED3\u675F\uFF0C\u91CD\u65B0\u5F00\u5C40"),this.reset(),!1;let s=this.getBlock(t,e);return s?s.isWall?(this.setStatusText("\u70B9\u51FB\u4F4D\u7F6E\u5DF2\u7ECF\u662F\u5899\u4E86\uFF0C\u7981\u6B62\u70B9\u51FB"),!1):this.cat.i===t&&this.cat.j===e?(this.setStatusText("\u70B9\u51FB\u4F4D\u7F6E\u662F\u732B\u5F53\u524D\u4F4D\u7F6E\uFF0C\u7981\u6B62\u70B9\u51FB"),!1):(s.isWall=!0,this.cat.isCaught()?(this.setStatusText("\u732B\u5DF2\u7ECF\u65E0\u8DEF\u53EF\u8D70\uFF0C\u4F60\u8D62\u4E86"),this.state="win",!1):(this.setStatusText(`\u70B9\u51FB\u4F4D\u7F6E (\u884C: ${e+1}\uFF0C\u5217:${t+1})`),this.cat.step()||(this.setStatusText("\u732B\u8BA4\u8F93\uFF0C\u4F60\u8D62\u4E86\uFF01"),this.state="win"),!0)):(this.setStatusText("\u4EE3\u7801\u9519\u8BEF\uFF0C\u5F53\u524D\u4F4D\u7F6E\u4E0D\u5B58\u5728"),!1)}setStatusText(t){this.statusBar.setText(t)}get blocks(){return this.data.get("blocks")}set blocks(t){this.data.set("blocks",t)}get blocksData(){let t=[];return this.blocks.forEach((e,s)=>{t[s]=[],e.forEach((i,r)=>{t[s][r]=i.isWall})}),t}create(){console.log("create"),this.scene.bringToTop(),this.keys=this.input.keyboard.createCursorKeys(),this.anims.create({key:"walking_cat",frames:this.anims.generateFrameNumbers("walking_cat",{frames:[0,1,2,3]}),frameRate:10,repeat:-1}),this.creditText=new E(this),this.statusBar=new w(this),new S(this).on("pointerup",()=>{this.sound.add("button_sound").play(),this.reset()}),this.createAnimations(),this.createBlocks(),this.createCat(),this.reset(),m=this.add.sprite(100,250,"walking_cat").play("walking_cat"),this.tweens.add({targets:m,props:{x:{value:"+=600",duration:6e3,flipX:!0},y:{value:"-=25",duration:7e3}},yoyo:!0,repeat:-1}),g=this.add.particles("snow"),g.createEmitter({x:400,y:0,angel:{min:10,max:360},speed:400,gravityY:100,lifespan:1200,quantity:1,scale:{start:.3,end:.3},blendMode:"ADD"}),g.setBlendMode(Phaser.BlendModes.ADD),this.input.keyboard.on("keydown-SPACE",()=>{this.cat.setScale(2,2),this.cat.scene.time.delayedCall(2e3,()=>{this.cat.setScale(1,1)}),console.log("space"),console.log("deter")});var e={font:"bold 20px Arial",fill:"#000000",boundsAlignH:"center",boundsAlignV:"middle"};f=this.add.text(32,32,"",e),d=new Phaser.Time.TimerEvent({delay:3e4}),this.time.addEvent(d)}getPosition(t,e){return{x:this.r*3+((e&1)===0?this.r:this.dx)+t*this.dx,y:this.r*3+this.r+e*this.dy}}getBlock(t,e){return t>=0&&t<this.w&&e>=0&&e<this.h?this.blocks[t][e]:null}randomWall(){for(let t=0;t<8;t++){let e=Math.floor(this.w*Math.random()),s=Math.floor(this.h*Math.random());if(e!==this.cat.i||s!==this.cat.j){let i=this.getBlock(e,s);i&&(i.isWall=!0)}}}createAnimations(){n.animations.forEach(t=>{let e=[];t.textures.forEach(s=>{e.push({key:s,frame:0})}),this.anims.create({key:t.name,frames:e,frameRate:n.frameRate,repeat:t.repeat})})}createCat(){let t=new b(this);t.on("escaped",()=>{this.state="lose"}),t.on("win",()=>{this.state="win"}),this.cat=t}resetBlocks(){this.blocks.forEach(t=>{t.forEach(e=>{e.isWall=!1})}),this.randomWall()}createBlocks(){let t=[];for(let e=0;e<this.w;e++){t[e]=[];for(let s=0;s<this.h;s++){let i=new B(this,e,s,this.r*.9);t[e][s]=i,i.on("player_click",this.playerClick.bind(this))}}this.blocks=t}update(){this.state=="playing"&&(c=d.getProgress(),Number((c.toString().substr(0,6)*30).toFixed(0))<=25?f.setText(["\u5012\u8BA1\u65F6\uFF1A"+(25-Number(c.toString().substr(0,6)*30).toFixed(0))+" \u79D2"]):Number((c.toString().substr(0,6)*30).toFixed(0))>25&&(this.state="time_out",f.setText(["\u5012\u8BA1\u65F6\uFF1A\u7ED3\u675F"])))}}class D extends Phaser.Scene{constructor(t,e,s){super({key:"StartScene"}),this.w=t,this.h=e,this.r=s,this.dx=this.r*2,this.dy=this.r*Math.sqrt(3)}create(){this.sound.add("bgm").play();var t={font:"bold 70px Arial",fill:"#b3d9ff",boundsAlignH:"center",boundsAlignV:"middle"},e=this.add.text(150,100,"Catch The Cat",t);e.setShadow(3,3,"#000",5);var s={font:"bold 40px Arial",fill:"#b3d9ff",boundsAlignH:"center",boundsAlignV:"middle"},i=this.add.text(250,528,"\u70B9\u51FB\u6B64\u5904\u7EE7\u7EED...",s);i.setShadow(1,3,"#000",1),i.setInteractive(),i.on("pointerdown",()=>{this.sound.add("button_sound").play(),console.log("From StartScene to StoryScene"),this.scene.start("StoryScene")}),this.add.image(100,100,"snow"),this.add.image(384,358,"logo").setScale(1.2)}}class _ extends Phaser.Scene{constructor(t,e,s){super({key:"StoryScene"}),this.w=t,this.h=e,this.r=s,this.dx=this.r*2,this.dy=this.r*Math.sqrt(3)}create(){var t={font:"bold 40px Arial",fill:"#b3d9ff",boundsAlignH:"center",boundsAlignV:"middle"},e=this.add.text(250,528,"\u70B9\u51FB\u6B64\u5904\u5F00\u59CB...",t);e.setShadow(1,3,"#000",1),e.setInteractive(),e.on("pointerdown",()=>{this.sound.add("button_sound").play(),console.log("From StoryScene to PlayScene"),this.scene.start("PlayScene")});var s={font:"bold 30px Arial",fill:"#3A99D9",boundsAlignH:"center",boundsAlignV:"middle"},i=this.add.text(20,228,"\u70B9\u51FB\u65B9\u5757\u5373\u53EF\u5EFA\u8D77\u56F4\u5899......",s);i.setText(["\u4ECE\u524D\u6709\u4E00\u4F4D\u732B\u56FD\u738B\uFF0C\u6709\u4E00\u5929\u5B83\u53D1\u73B0\u5B83\u6700\u73CD\u8D35\u7684\u5B9D\u5251\u88AB\u5077\u4E86\uFF0C","\u8BF7\u4F60\u5E2E\u52A9\u732B\u56FD\u738B\uFF0C\u628A\u5177\u6709\u91CD\u5927\u5ACC\u7591\u7684\u732B\u81E3\u5B50\u6293\u8D77\u6765\u3002","\u70B9\u51FB\u5C0F\u5706\u70B9\u5373\u53EF\u5EFA\u8D77\u56F4\u5899\uFF0C\u6309\u7A7A\u683C\u4EA7\u751F\u5A01\u6151\u529B","\u6E38\u620F\u9650\u65F625\u79D2"]);var r=this.add.sprite(600,100,"sound_line").setScale(1),a=this.add.sprite(615,100,"sound_button").setScale(.4);a.setInteractive(),r.setInteractive(),this.sound_tween=this.tweens.add({targets:a,x:480,y:100,duration:500,ease:"Sine.easeIn",paused:!0}),r.on("pointerdown",()=>{this.sound.add("button_sound").play(),console.log("The volume is being changed..."),this.sound_tween.play()}),this.tweens.add({targets:i,y:400,duration:3e3,ease:"Expo.easeInOut",yoyo:!0})}update(){if(this.sound_tween.isPlaying()&&this.input.x<=600+300&&this.input.x>600){this.sound_tween.updateTo("x",this.input.x,!1);var t=this.input.x-615;t>=0?this.sound.volume+=.05:t<0&&(this.sound.volume-=.05),this.input.x<=650&&this.sound.stop()}}}class k extends Phaser.Game{constructor(t){let e=t.w,s=t.h,i=t.r*window.devicePixelRatio,r=1/window.devicePixelRatio,a=Math.floor((6.5+2*e)*i),l=Math.floor((6+Math.sqrt(3)*s)*i),h=new p(e,s,i);const o={width:a,height:l,type:Phaser.AUTO,parent:t.parent,backgroundColor:t.backgroundColor,scene:[F,D,_,h],zoom:r};super(o),this.mainScene=h}}window.addEventListener("load",()=>{new k(n.myconfig)});
