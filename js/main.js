$(function(){
	$(".collections_list li").click(function(){
		var imgsrc = $(this).find(".photo img").attr("data-url");
        $("#popbg").show();
        $(".pop_con img").attr("src",imgsrc);
	})

    $("#popbg").click(function(){
        $("#popbg").hide();
        $(".pop_con img").attr("src","imgsrc");
    })


})



function pageChange(funid){
     $(".page").css("display","none");
     $("#"+funid).css("display","inline-block");
}









/* 执行函数 */
function previewImage(file){
	if (file.files && file.files[0]){
		var reader = new FileReader();
	    var img = new Image();
	    var displayImg=new Image();

	    img.onload=function(){
			pageChange("doing");
            backgroundImg(img.src);
	    }
	    reader.onload = function(evt){
	      	var copy=evt.target.result;
       		if(file.files[0].type==''){
       		 	copy='data:image/jpeg;base64,'+copy.substr(12);
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




var update = true;
var stage,canvas,canvasWidth,canvasHeight,proportion;

function canvasFun(){
   /* canvas 执行函数 */
	canvas= document.getElementById("synCnavas");
	canvas.id="synCnavas";
	canvasWidth = $(window).width()*0.83;
	canvasHeight = $(window).height()*0.46;
	//($(window).width()-$(window).width()*0.9)/2

	proportion = $(window).width()/640;

	canvas.width= canvasWidth;
	canvas.height= canvasHeight;
	stage = new createjs.Stage(canvas);


	createjs.Touch.enable(stage);
	stage.enableMouseOver(10); 
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", stage);
}




/* 元素背景图片 */
var bitmap,offset;
function backgroundImg(imgUrl){
	$("#doingInput").val("");
	canvasFun();
    bitmap = new createjs.Bitmap(imgUrl);  //加载图片
    bitmap.scaleX = proportion;
    bitmap.scaleY = proportion;
    stage.addChild(bitmap);

   
	bitmap.cursor = "pointer";
	
	// assign the hit area:
	bitmap.addEventListener("mousedown", function(evt) {
		// bump the target in front of its siblings:
		var o = evt.target;
		///o.parent.addChild(o);
		o.offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
	});

	// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	bitmap.addEventListener("pressmove", function(evt) {
		//return false;
		var o = evt.target;
		o.x = evt.stageX+ o.offset.x;
		o.y = evt.stageY+ o.offset.y;
		// indicate that the stage should be updated on the next tick:
		//update = true;
	});

	var whiteblock = new createjs.Shape();   //画图 
	whiteblock.graphics.beginFill("#fff").drawRect(0, canvasWidth-100, canvasWidth, 70);
	stage.addChild(whiteblock);

}





var faceimg;
function faceimg1(){
    stage.removeChild(faceimg);
    faceimg = new createjs.Bitmap("../images/p1.png");
	faceimg.x = canvasWidth-82;
	faceimg.y = canvasHeight-97;
    stage.addChild(faceimg);
}
function faceimg2(){
    stage.removeChild(faceimg);
    faceimg = new createjs.Bitmap("../images/p2.png");
	faceimg.x = canvasWidth-82;
	faceimg.y = canvasHeight-97;
    stage.addChild(faceimg);
}
function faceimg3(){
    stage.removeChild(faceimg);
    faceimg = new createjs.Bitmap("../images/p3.png");
	faceimg.x = canvasWidth-82;
	faceimg.y = canvasHeight-97;
    stage.addChild(faceimg);
}
function faceimg4(){
    stage.removeChild(faceimg);
    faceimg = new createjs.Bitmap("../images/p4.png");
	faceimg.x = canvasWidth-82;
	faceimg.y = canvasHeight-97;
    stage.addChild(faceimg);
}



var text = new createjs.Text("", "16px Arial", "#a2a2a2");
function inputFun(textVal){
    text.y=canvasHeight-54;
    text.x=4;
    text.text=textVal;
    text.lineHeight = 24; 
    text.color="#333";
    //text.textBaseline = "alphabetic";
    //text.maxWidth = "100"
    stage.addChild(text);
}

var inputObject = document.getElementById("doingInput");
inputObject.addEventListener("onchange", inputClick);
function inputClick(event) {
	if(this.value==""){
	    $("#doingInput").animate({"opacity":1});
	}else{
        $("#doingInput").animate({"opacity":0});
	}
	inputFun(this.value);
}


$("#doingInput").change(function(){
	if($(this).val()==""){
	    $("#doingInput").animate({"opacity":1});
	}else{
        $("#doingInput").animate({"opacity":0});
	}
	inputFun($(this).val());
})





function creatOk(){
	//stage.removeChild(cMask);
	//stage.update();	
	var syn_base=document.getElementById("synCnavas").toDataURL("image/png");
	pageChange("result");
	$("#resultImg").attr("src",syn_base);
	//$("#curphoto").attr("src",syn_base);
	//$("#fileArea").hide()
	//ar aa = "base65:---------34534850345879872398472394";
    console.log(syn_base.split("base64,")[1]);
	//tBase(syn_base.split("base64,")[1]);
}



/*function cancelFun(){
	 stage.removeChild(text);
     stage.removeChild(faceimg);
     stage.removeChild(bitmap);
}
*/





