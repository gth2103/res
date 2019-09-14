var getItems = function(){

    items.forEach(function(item){

    	current_user_items = current_user.items_list

    	is_current_user_item = false;

    	current_user_items.forEach(function(current_user_item){

    		if (item.item_id  === current_user_item){
    			is_current_user_item = true;
    		}

    	})
    	var div = ""
    	if (is_current_user_item){

    		div = '<div class="col-3 my-5 text-center"><img class="item-thumbnail mb-4" src="' + item.image + '"><br>' + item.title + '<br><br><button id="' + item.item_id + '" class="view btn btn-outline-warning my-2 my-sm-0 text-center" type="submit">View</button></div>'
    	}
    	else {

    		div = '<div class="col-3 my-5 text-center"><img class="item-thumbnail mb-4" src="' + item.image + '"><br>' + item.title + '<br><br><button id="' + item.item_id + '" class="view btn btn-outline-warning my-2 my-sm-0 ml-4 float-left" type="submit">View</button><button id="' + item.item_id + '" class="request btn btn-outline-primary my-2 my-sm-0 mr-4 float-right" type="submit">Request</button></div>'
    	}
    	$('#items').append(div)
    })
    request()
    view()
}

var send_request = function(new_request){
	var request_to_add = new_request
    $.ajax({
        type: "POST",
        url: "send_request",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(request_to_add),
        success: function(result){
            console.log(result);
            var all_requests = result["buyers"]
            alert("Your request has been sent. Click the 'Your Requests' tab in the menu to view your requests.")
        },
        error: function(request, status, error){
        	alert("Oops! Something went wrong. Please try again.")
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

var view_item = function(item_id){
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
    });
}


var request = function(){

	$('.request').on('click', function(e){

		e.preventDefault()

		var request_id = $(this).attr("id")
		var user_id
		var seller = ""
		var title = ""

		items.forEach(function(item){
			if(item.item_id == request_id){
				user_id = item.user_id
				title = item.title
			}

		})
		users.forEach(function(user){
			if(user.user_id == user_id){
				seller = user.user
			}
		})

        var new_request = jQuery.parseJSON( '{ "request_id": "' + request_id + '", "user_id": "' + user_id + '", "seller": "' + seller + '", "title": "' + title + '" }')

		send_request(new_request)
	})
}

var view = function(){

	$('.view').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		view_item(item_id)
	})


}

var requests = function(){

	$('.requests').on('click', function(){
		window.location = '../requests'
	})
}

$(document).ready(function(){

	getItems();
	requests()

})