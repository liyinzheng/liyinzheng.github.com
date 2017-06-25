$(function(){

				var $msg=$('.msg');
				var $xhb=$('.xhb .redbag');
				var $guanbi=$('.guanbi');
				var $hongbao=$('.hongbao');
				var $hongbaoye=$('.hongbaoye');
				var $chaihongbao=$('.chaihongbao');
				var $kanshouqi=$('.kanshouqi');
				var $hongbaoye=$('.hongbaoye');
				var jishuqi=0,h=40,height;
				height=$(window).height()-$('.bottom').height();
				$('.content').height(height);
				
				
				
				var theaudio=document.getElementById("music");
				theaudio.load();
				
				 document.addEventListener("WeixinJSBridgeReady", function () { 
			        theaudio.load(); 
			    }, false); 
				
				
				$xhb.eq(0).on('click',function(){
					$hongbao.eq(0).show();
				})
				
				$guanbi.eq(0).on('click',function(){
					$hongbao.eq(0).hide();
					$xhb.eq(0).off('click');
					getmessage(jishuqi+1);
				})
				
				$chaihongbao.eq(0).on('click',function(){
					$hongbao.eq(0).hide();
					$hongbao.eq(1).show();
				})
				
				$guanbi.eq(1).on('click',function(){
					$hongbao.eq(1).hide();
					$xhb.eq(0).off('click');
					getmessage(jishuqi+1);
				})
				
				$kanshouqi.on('click',function(){
					$hongbao.eq(1).hide();
					$hongbaoye.show();
				})
				
				$guanbi.eq(2).on('click',function(){
					$hongbaoye.hide();
					$xhb.eq(0).off('click');
					getmessage(jishuqi+1);
				})
				
				$xhb.eq(1).on('click',function(){
					$hongbao.eq(2).show();
				})
				
				function getmessage(x){
					var $msgx=$('.msg-'+x);
					var mh=$msgx.height();
					var hs;
					
					if(h>=height){
						$msg.animate({'top':'-='+(mh+10)});
					}
					else{
						hs=h+$msgx.height()+10;
						if(hs>height) $msg.animate({'top':'-='+(hs-height+10)});
						h=hs;
						
					}
					
					if(x>0) theaudio.play();
					$msgx.fadeIn(1500,function(){
						if(!$msgx.hasClass('xhb')){
							getmessage(x+1);
						}
						else jishuqi=x;
					});
				}
				
				getmessage(0);
				
			})