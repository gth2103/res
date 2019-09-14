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

    		div = '<div class="col-3 my-5 text-center"><img class="item-thumbnail mb-4" src="' + item.image + '"><br>' + item.title + '<br><br><button id="' + item.item_id + '" class="update btn btn-outline-warning my-2 my-sm-0 ml-4 float-left" type="submit">Update</button><button id="' + item.item_id + '" class="delete btn btn-outline-primary my-2 my-sm-0 mr-4 float-right" type="submit">Delete</button></div>'
    	}
    	$('#items').append(div)
    })
    update()
    delete_item()
}

var update_item = function(item_id){
    $.ajax({
        type: "POST",
        url: "update_item/" + item_id,                
        success: function(result){
            window.location = '../update_item/' + item_id
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

var update  =  function(){

    $('.update').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr("id")

        update_item(item_id)
    })
}

var delete_item = function(){
    $('.delete').on('click', function(e){

        e.preventDefault()

        var item_id = $(this).attr("id")

        del_item(item_id)
    })
}

$(document).ready(function(){

    getItems();

})