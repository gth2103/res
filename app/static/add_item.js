var add_item = function(new_item){
	var item_to_add = new_item
    $.ajax({
        type: "POST",
        url: "add_item",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(item_to_add),
        success: function(result){
            console.log(result);
            var all_items = result["items"]
            alert("Your item has been added.")
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



var get_previous = function(){
    return localStorage.getItem("previous");
}


var cancel = function(){

    $('#cancel').on('click', function(){

        location.href = get_previous()
    })
}

var submit = function(){

    var form = $('#add_item_form')

    form.validate()

    $('#submit_item').on('click', function(e){

        e.preventDefault()

        var item_id = $('input#item-id').val()
        var title = $('input#title').val()
        var location = $('input#location').val()
        var image = $('input#img').val()
        var categories = $('input#categories').val()
        var details = $.trim($('textarea#textareaDetails').val()).replace(/\"/g, "\\\"")
        var price = $('input#price').val()

        console.log(price)

        var new_item = jQuery.parseJSON( '{ "item_id": "' + item_id + '", "title": "' + title + '", "location": "' + location + '", "image": "' + image + '",  "categories": "' + categories + '", "details": "' + details + '", "price": "' + price + '" }')

        add_item(new_item)
    })
}

$(document).ready(function(){

    submit()
    cancel()

	    
})