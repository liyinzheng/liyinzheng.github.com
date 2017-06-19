	$(function() {

				function preLoadImg(t) {
					var imgs = new Array();
					for(var i=0;i<t.length;i++){
						imgs[i]=new Image;
						imgs[i].src = t[i];
					}
				}
				
				var theImage=[ "http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/bag-1.png", 
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/bag-2.png", 
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/bag-3.png", 
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/back.jpg",
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/liuxing.png",
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/prize-1.png",
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/prize-2.png",
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/prize-3.png",
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/prize-4.png",
					"http://img-big.tiantian.com/cuxiaoqu2011/170608tian/hb/gameover.png"
				];
			
				preLoadImg(theImage);

				hongbaogame = {
					box:[],
					gametime: 11,
					gamePause: 0,
					
					prepare: function(){
						$(".start-btn").one('click',function(){
//							点击开始按钮,开始游戏
							redbag.mystart()
						});
					},
					
					start: function(count) {
						remaketime = 3;
						readytime=3;
						cishu = count;
						gotime = hongbaogame.gametime;
						hongbaonumber=13;
						
						$(".hd_main").append('<div class="pages"><div class="page"></div><div class="liuxing"></div></div>')
						
//						console.log(readytime);
//						$(".btn").remove();
						for(var i=0;i<hongbaonumber;i++){
								hongbaogame.box[i]='<div class="box box-'+i+'"></div>';
								$(".page").append(hongbaogame.box[i]);
							}
						$(".box").each(function(index, item) {
							hongbaogame.makebox(item);
						});
						$(".page").append('<div class="daojishi-1"></div>');
						hongbaogame.ready(readytime);
//						$(".page").append('<div class="daojishi-2"></div>');
//						hongbaogame.go();
					},

					ready: function(t) {
//						console.log(readytime);
						if(t > 0) {
							readytime--;
							$(".daojishi-1").text(t);
							setTimeout(function() {
								hongbaogame.ready(t-1)
							}, 1000);
						} else {
							$(".daojishi-1").remove();
							$(".page").append('<div class="daojishi-2"></div>');
							hongbaogame.go();
						}
					},

					go: function() {
						$(".box").show();
						if(gotime > 0) {
							//							开始时随机3个跳动
							if(gotime == hongbaogame.gametime) {
								function getRandoms(options) {
									var randoms = [];
									while(true) {
										var isExists = false,
											min = options.min,
											max = options.max,
											amount = options.amount;
										// 获取一个范围内的随机数
										var random = Math.floor(min + (max - min + 1) * Math.random())
										// 判断当前随机数是否已经存在
										for(var i = 0; i < randoms.length; i++) {
											if(random === randoms[i]) {
												isExists = true;
												break;
											}
										}
										// 如果不存在，则添加进去
										if(!isExists)
											randoms.push(random);
										// 如果有若干位随机数了，就跳出
										if(randoms.length === amount)
											break;
									}
									return randoms;
								}
								var trans = getRandoms({
									min: 0,
									max: 9,
									amount: 3
								});
//								for(var k = 0; k < trans.length; k++) {
									hongbaogame.jump($(".box")[trans[0]]);
									
									setTimeout(function(){
										hongbaogame.jump($(".box")[trans[1]]);
									},500)
									
									setTimeout(function(){
										hongbaogame.jump($(".box")[trans[2]]);
									},1000)
//								}
							}
							
							gotime--;
							
							$(".daojishi-2").text(gotime);
						
							if(hongbaogame.gamePause==0)
							theTimer1=setTimeout(function() {
								hongbaogame.go()
							}, 1000);
						} 
						else hongbaogame.end();
					},

					end: function() {
						$(".pages").append('<div class="pop"><div class="pop-box game-over"><a class="go-on replay">继续玩</a><a class="to-share">分享给好友</a></div></div>');
						$(".replay").click(function() {
							$(".page").empty();
							$(".pop").remove();
							redbag.mystart()
						})
					},

					makebox: function(item) {
						$(item).removeClass('zhongjiang');
						$(item).removeClass('meizhongjiang');
						$(item).empty();
						if(gotime < hongbaogame.gametime) hongbaogame.jump(item);
						$(item).one('click', function() {
							
								$(".pages").append('<div class="pop2"></div>');
								setTimeout(function(){
									$(".pop2").remove();
								}, 500)	
								
								if(Math.random() < 0.5) {
									redbag.zhongjiangss(item)
								}
								else hongbaogame.meizhongjiang(item);
								
						})
					},
					
 
         
         			zhongjiang: function(item, x){
						$(item).addClass('zhongjiang');

						$('.pages').append('<div class="pop"><div class="pop-box prize-'+x+'"><a class="go-on" onclick="hongbaogame.goon()">继续玩</a><a class="to-share">分享给好友</a></div></div>');
						hongbaogame.remakebox(item);
						hongbaogame.gamePause=1;
						clearTimeout(theTimer1);
						cishu--
         			},
         
					meizhongjiang: function(item) {
						$(item).addClass('meizhongjiang');
						hongbaogame.remakebox(item);
					},
					
					
					remakebox: function(item){
						if(gotime > remaketime) setTimeout(function() {
							if(hongbaogame.gamePause==1){
								hongbaogame.remakebox(item);
							}
							else hongbaogame.makebox(item);
						}, remaketime * 1000);
					},
					
					goon: function(){
						$(".pop").remove();
						hongbaogame.gamePause=0;
						hongbaogame.go();
					},

					jump: function(item) {
						$(item).animate({ 'left': '-=10px' }, 'fast');
						$(item).animate({ 'left': '+=20px' }, 'fast');
						$(item).animate({ 'left': '-=20px' }, 'fast');
						$(item).animate({ 'left': '+=10px' }, 'fast');
					}
				}
				
				
				var redbag={

					zhongjiangss: function(item) {
						
//						获取本次点击中奖情况信息
						var temp = Math.random();
						if(temp < 0.1)  { hongbaogame.zhongjiang(item,1); } 
						else if(temp < 0.3) { hongbaogame.zhongjiang(item,2); }
						else if(temp < 0.6) { hongbaogame.zhongjiang(item,3); }
						else hongbaogame.meizhongjiang(item);
						
						cishu--;
					},
					
					
					mystart: function(){
//						获取可用次数
						var mycount=3;
						hongbaogame.start(mycount);
					},
				}
				
				
				hongbaogame.prepare();
				
			

			})