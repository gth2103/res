var getItems = function(){

    items.forEach(function(item){

        if(item != null && item.item_id != null){

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

                div = '<div class="col-3 my-5 text-center"><img class="item-thumbnail mb-4" src="' + item.image + '"><br>' + item.title + '<br><br><button id="' + item.item_id + '" class="view btn btn-outline-warning my-2 my-sm-0 ml-4 float-left" type="submit">View</button><button id="' + item.item_id + '" class="add_to_cart btn btn-outline-primary my-2 my-sm-0 mr-4 float-right" type="submit">Add to cart</button></div>'
            }
            $('#items').append(div)
        }
    })
    add_to_cart()
    view()
}

var add_item_to_cart = function(new_item){
	var item_to_add = new_item
    $.ajax({
        type: "POST",
        url: "add_to_cart",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(item_to_add),
        success: function(result){
            console.log(result);
            var all_items = result["buyers"]
            alert("Item has been added to cart. Click 'Cart' in the menu to view your items.")
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


var add_to_cart = function(){

	$('.add_to_cart').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")
		var user_id
		var seller = ""
		var title = ""

		items.forEach(function(item){
			if(item.item_id == item_id){
				user_id = item.user_id
				title = item.title
			}

		})
		users.forEach(function(user){
			if(user.user_id == user_id){
				seller = user.user
			}
		})

        var new_item = jQuery.parseJSON( '{ "item_id": "' + item_id + '", "user_id": "' + user_id + '", "seller": "' + seller + '", "title": "' + title + '" }')

		add_item_to_cart(new_item)
	})
}

var view = function(){

	$('.view').on('click', function(e){

		e.preventDefault()

		var item_id = $(this).attr("id")

		view_item(item_id)
	})


}

var cart = function(){

	$('.cart').on('click', function(){
		window.location = '../cart'
	})
}

$(document).ready(function(){

	getItems();
	cart()

})