from flask import request
from app.users import current_user
from app.items import items

def add_data(index):

	user_id = get_value(current_user, 'user_id')

	json_data = request.get_json()
	item_id = index
	title = json_data["title"]
	location = json_data["location"]
	image = json_data["image"]
	categories = json_data["categories"]
	details = json_data["details"]
	price = json_data["price"]

	new_item_entry = {
		"user_id": user_id,
		"item_id": item_id,
		"title": title,
		"location": location,
		"image": image,
		"categories": categories,
		"details": details.replace("\\", ""),
		"price": price
	}

	add_to_list(items, new_item_entry, index)

	set_value(current_user, 'items_list', item_id)

def search(search_list):

	search_in = request.data.decode("utf-8")

	for item in items:
		for key, value in item.items():
			if key ==  'title' or key == 'location' or key == 'details':
				if search_in.lower() in value.lower() and item not in search_list:
					add_to_list(search_list, item, len(search_list))


def get_index(list):
    return len(list)

def add_to_list(item_list, item, index):
	if item not in item_list:
		if int(index) < len(item_list):
			item_list.pop(int(index))
		item_list.insert(int(index), item)

def get_value(json_object, key_string):
	for key, value in json_object.items():
		if key == key_string:
			return value

def set_value(json_object, key_string, new_value):
	for key, value in json_object.items():
		if key == key_string:
			add_to_list(value, new_value, len(value))

def delete_data(json_object, key_string, item_list, id_to_remove):

	null_entry = {
		"item_id": None,
	}

	for key, value in json_object.items():
		if (key == key_string):
			for item_id in value:
				if (str(item_id)  == id_to_remove):
					value.remove(item_id)

	for item in item_list:
		for key, value in item.items():
			if (key == 'item_id'):
				if (str(value) == id_to_remove):
					item_list.remove(item)
					item_list.insert(int(value), null_entry)


