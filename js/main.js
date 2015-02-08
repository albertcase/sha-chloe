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











