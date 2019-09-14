var setUserOptions = function(){

	current_user_items = current_user.items_list

    is_current_user_item = false;

	current_user_items.forEach(function(current_user_item){

    	if (item.item_id  === current_user_item){
    			is_current_user_item = true;
    	}

    })
    var div  = ""
    if (is_current_user_item){
    	div = '<br><button class="update btn btn-outline-warning m-5" type="submit">Update</button><button class="delete btn btn-outline-danger m-5" type="submit">Delete</button>'
    }
    else {

    	div = '<br><button class="request btn btn-outline-primary m-5" type="submit">Request</button>'
    }
    $('#item-left-side').append(div);
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
            var all_requests = result["requests"]
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

var home = function(){

	$('.home').on('click', function(){
		window.location = '../home'
	})
}

var  del_item = function(item_id) {
    $.ajax({
        type: "POST",
        url: "delete/" + item_id,                
        success: function(result){
            window.location = '../update'
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

var delete_item = function(){
    $('.delete').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr("id")

        del_item(item_id)
    })
}

$(document).ready(function(){



	setUserOptions()
	request()
	home()

})