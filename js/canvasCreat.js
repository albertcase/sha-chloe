
function setCreat(img,fn){
	var imgWidth=img.width;
	var imgHeight=img.height;
	var $bl=$(window).width()/imgWidth*2;
	var maxWidth=imgWidth*$bl;
	var maxHeight=imgHeight*$bl;
	var hRatio;
	var wRatio;
	var Ratio = 1;
	
	wRatio = maxWidth / imgWidth;
	hRatio = maxHeight / imgHeight;
	if (maxWidth ==0 && maxHeight==0){
	Ratio = 1;
	}else if (maxWidth==0){//
	if (hRatio<1) Ratio = hRatio;
	}else if (maxHeight==0){
	if (wRatio<1) Ratio = wRatio;
	}else if (wRatio<1 || hRatio<1){
	Ratio = (wRatio>=hRatio?wRatio:hRatio);
	}
	var scale = (wRatio >= wRatio)?wRatio:wRatio
	
	
	var drawWidth=scale*imgWidth;
	var drawHeight=scale*imgHeight;
	
	var offsetX=0//(maxWidth-drawWidth)/2;
	var offsetY=0//(maxHeight-drawHeight)/2;
		 
	//客户端判断 IOS执行
	var copy = document.getElementById('synCnavas');
		var context=copy.getContext('2d');
		context.clearRect(0,0,copy.width,copy.height);
		drawImageIOSFix(context,img,0,0,imgWidth,imgHeight,offsetX,offsetY,drawWidth,drawHeight)	
}


//队列加载img
function getImg(url) {
var def = $.Deferred();
var img = new Image();


img.onload=function(){
	def.resolve(this); 
}
img.onerror = function(err) {
	def.reject(err);
};
img.src = url;
return def.promise();
};

var stage;

var canvas;

var mouseTarget;	// the display object currently under the mouse, or being dragged
var dragStarted;	// indicates whether we are currently in a drag operation
var offset;
var update = true;

function draw(imgUrl){
	
	//缩放比例
	var curWidth = parseInt($(".doingEdit").css("width"));
	var curHeight = parseInt($(".doingEdit").css("height"));
	var $Proportion=$(window).width()/640;
    canvas= document.getElementById("synCnavas");
	canvas.id="synCnavas";
	canvas.width=curWidth;
	canvas.height=curHeight;
	stage = new createjs.Stage(canvas);
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
	
	shape = new createjs.Shape();
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", stage);
	
	shape.graphics.beginStroke("#d5b487").beginFill("#fff").drawRect(0, 0, curWidth, curHeight);
	stage.addChild(shape);
	$.when(
		getImg(imgUrl) //,getImg('model.png')
	).then(function() {
		imgArr=arguments;
		creatPic();
		//creatMask();
	}).fail(function() {
		//console.log('loadfaile!');
	});
	
	
	function stop() {
		createjs.Ticker.removeEventListener("tick", tick);
	}
	
	this.creatPic=function(){
		cPic = new createjs.Bitmap(imgArr[0]);
		var  curWidth= parseInt($(".doingEdit").css("width"));
		var  curHeight= parseInt($(".doingEdit").css("height"));
		cPic.x=0;
		cPic.y=0;


		stage.addChild(cPic);

		
		cPic.scaleX=0.5;
	    cPic.scaleY=0.5;
		


			cPic.cursor = "pointer";
			
			// assign the hit area:

			cPic.addEventListener("mousedown", function(evt) {
				//return false;
				// bump the target in front of its siblings:
				var o = evt.target;
				o.parent.addChild(o);
				o.offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
			});
			
			// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
			cPic.addEventListener("pressmove", function(evt) {
				//return false;
				var o = evt.target;
				o.x = evt.stageX+ o.offset.x;
				o.y = evt.stageY+ o.offset.y;
				// indicate that the stage should be updated on the next tick:
				update = true;
			});
			
			cPic.addEventListener("rollover", function(evt) {
				return false;
				var o = evt.target;
				o.scaleX = o.scaleY = o.scale*1.2;
				update = true;
			});
			
			cPic.addEventListener("rollout", function(evt) {
				return false;
				var o = evt.target;
				o.scaleX = o.scaleY = o.scale;
				update = true;
			});


			createjs.Ticker.addEventListener("tick", tick);

	     	stage.update();	
			
	}
	
	function tick(event) {
		// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
		if (update) {
			update = false; // only update once
			stage.update(event);
		}
	}
	
	
	/*this.creatMask=function(){
		cMask = new createjs.Bitmap(imgArr[1]);
		cMask.scaleX=$Proportion;
		cMask.scaleY=$Proportion;
		cMask.x=(document.getElementById("synCnavas").width-(imgArr[1].width*$Proportion))/2;
		cMask.y=0;
		cMask.regX=0;
		cMask.regY=0;

		stage.addChild(cMask);
		stage.update();	
	}*/
	
	
	
}












/* 执行函数 */
function previewImage(file){
	if (file.files && file.files[0]){
		var reader = new FileReader();
	    var img = new Image();
	    var displayImg=new Image();

	    img.onload=function(){
			
		    var imgWidth=img.width;
			var imgHeight=img.height;
            
			//设置显示图片默认大小
			MAXWIDTH =imgWidth* ($(window).width()/img.width)*2;   
			MAXHEIGHT =imgHeight * ($(window).width()/img.width)*2;
			
			MAXHEIGHT=MAXWIDTH;
			
			var maxWidth=MAXWIDTH;
			var maxHeight=MAXHEIGHT;
			
			var hRatio;
			var wRatio;
			var Ratio = 1;
			wRatio = maxWidth / imgWidth;
			hRatio = maxHeight / imgHeight;
			if (maxWidth ==0 && maxHeight==0){
				Ratio = 1;
			}else if (maxWidth==0){//
			if (hRatio<1) Ratio = hRatio;
			}else if (maxHeight==0){
			if (wRatio<1) Ratio = wRatio;
			}else if (wRatio<1 || hRatio<1){
				Ratio = (wRatio>=hRatio?wRatio:hRatio);
			}
			var scale = (wRatio >= wRatio)?wRatio:wRatio;
			var drawWidth=scale*imgWidth;
			var drawHeight=scale*imgHeight;
			var offsetX=(maxWidth-drawWidth)/2;
			var offsetY=(maxHeight-drawHeight)/2;
			//客户端判断 IOS执行
			var copy = document.createElement('canvas');
			copy.width=MAXWIDTH;
			copy.height=MAXHEIGHT;
	      	var context=copy.getContext('2d');
	      	context.clearRect(0,0,copy.width,copy.height);
			
	      	drawImageIOSFix(context,img,0,0,imgWidth,imgHeight,offsetX,offsetY,drawWidth,drawHeight);
		    //displayImg.src=copy.toDataURL("image/jpeg");
			draw(copy.toDataURL("image/jpeg"));
			console.log(copy.toDataURL("image/jpeg"))
	    }
	    reader.onload = function(evt){
	      	var copy=evt.target.result;
       		if(file.files[0].type==''){
       		 	copy='data:image/jpeg;base64,'+copy.substr(12);
				draw(copy);
       		}else{
       			if(file.files[0].type!='image/jpeg'&&file.files[0].type!='image/png'&&file.files[0].type!='image/gif'){
       				alert("选择的文件格式错误");
       				return;
       			}
       		}
			if(browser.versions.ios==true){
				img.src = copy;
			}else{
				img.src = copy;
			}
			
	    }
	    reader.readAsDataURL(file.files[0]);
	}
}

function detectVerticalSquash(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
        
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
}


function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio = detectVerticalSquash(img);
    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio, 
                       sw * vertSquashRatio, sh * vertSquashRatio, 
                       dx, dy, dw, dh );
}

var browser={
	versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        };
    }()
}


/*function showPreview(source){
	var file = source.files[0];
	var reader = new FileReader();
	reader.onload = function(evt){
		var img=new Image();
		img.onload=function(){
			setCreat(img);
		}
		img.src=evt.target.result;
	}
	reader.readAsDataURL(source.files[0]);
	
}*/


function creatOk(){
	//stage.removeChild(cMask);
	stage.update();	
	var syn_base=document.getElementById("synCnavas").toDataURL("image/png");
	$("#curing").attr("src",syn_base);
	//$("#fileArea").hide()
	//var aa = "base65:---------34534850345879872398472394";
    //console.log(aa.split("base65:")[1]);
	
	//setBase(syn_base.split("base64,")[1]);
}






//取消上传
function cancelUploadFile(){
	   $("#fileArea").hide()	
}








