$(document).ready(function(){

    $('#buy').on('click', function(){

    	window.location  = '../buy'
   	})
    $('#sell').on('click', function(){
    	window.location  = '../sell'
   })

    $('#buy').on('mouseover', function(){
    	$('#sell').removeClass("visible")
    	$('#sell').addClass("invisible")
   	})
    $('#sell').on('mouseover', function(){
    	$('#buy').removeClass("visible")
    	$('#buy').addClass("invisible")
   })
    $('#buy').on('mouseout', function(){
    	$('#sell').removeClass("invisible")
    	$('#sell').addClass("visible")
   	})
    $('#sell').on('mouseout', function(){
    	$('#buy').removeClass("invisible")
    	$('#buy').addClass("visible")
   })
})
