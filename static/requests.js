
var get_requests = function(){

	if (requests === undefined || requests.length == 0) {

		var div = '<li class="cart-item mt-2 mb-2"><hr>Your have not requested any items!</li>'

    	$('#requests').append(div)
	}
	else {
		requests.forEach(function(item_id){

			var div = ""

			items.forEach(function(item){

				if(item.item_id == item_id) {

					div = '<li class="cart-item mt-2 mb-2"><hr><img class="item-mini mb-2" src="' + item.image + '"><span class="ml-5">' + item.title + '</span><button id="' + item.item_id + '" class="remove btn btn-outline-danger mt-4 mr-2 float-right" id="item-id" type="submit"> Remove </button><button id="' + item.item_id + '" class="view btn btn-outline-warning mt-4 mr-2 float-right" id="item-id" type="submit"> View </button></li>'
				}
			})
    		$('#requests').append(div)
    	})
	}

    
    remove()
    view()
}

var remove_request = function(item_id){
	$.ajax({
        type: "POST",
        url: "remove_request/" + item_id,                
        success: function(result){
        	window.location.reload()
        },
        error: function(request, status, error){
        	alert("Oops! Something went wrong. Please try again.")
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

var remove  = function(){

	$('.remove').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		remove_request(item_id)


	})
}

var view_request = function(item_id){
    $.ajax({
        type: "POST",
        url: "view_item/" + item_id,                
        success: function(result){
        	window.location = '../item/' + item_id
        },
        error: function(request, status, error){
        	alert("Oops! Something went wrong. Please try again.")
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

var view = function(){

	$('.view').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		view_request(item_id)
	})


}

var home = function(){

	$('.home').on('click', function(){
		window.location = '../home'
	})
}

$(document).ready(function(){

	get_requests()
	home()
})