import logging
from flask import render_template, Response, request, jsonify, redirect, url_for
from seed import *
from app import app

sellers = []

for user in users:
	for key, value  in user.items():
		if key == 'items_list':
			if value:
				for key, value in user.items():
					if key == 'user_id':
						sellers.append(value)

buyers = []


user_index = len(users)
item_index  = len(items)
buyers_index  = len(buyers)

current_user = users[1]

for key, value in current_user.items():
	if key == 'requests':
		requests = value

@app.route('/home', methods=['GET', 'POST'])
def home():
	global items
	global current_user
	global users
	return render_template('home.html', items = items, current_user = current_user, users = users)

@app.route('/add_item', methods=['GET', 'POST'])
def add_item():
	global item_index
	global current_user
	global items

	for key, value in current_user.items():
		if key == 'user_id':
			user_id = value

	if request.method == 'POST':

		json_data = request.get_json()
		item_id = item_index
		title = json_data["title"]
		location = json_data["location"]
		image = json_data["image"]
		categories = json_data["categories"]
		details = json_data["details"]
		price = json_data["price"]

		print(price)

		new_item_entry = {
		    "user_id": user_id,
		    "item_id": item_id,
		    "title": title,
		    "location": location,
		    "image": image,
		    "categories": categories,
		    "details": details,
		    "price": price
		}

		items.append(new_item_entry)

		item_index  = len(items)

		for key, value in current_user.items():
			if key == 'items_list':
				value.append(item_id)

		return jsonify(items = items)
	else:
		return render_template('add_item.html', item_index = item_index)

@app.route('/send_request', methods=['GET', 'POST'])
def send_request():
	global buyers

	json_data = request.get_json()
	item_id = json_data["request_id"]
	user_id = json_data["user_id"]
	seller = json_data["seller"]
	title = json_data["title"]

	buyer = ""

	for key, value in current_user.items():
		if(key == 'user'):
			buyer = value

	new_buyer_entry = {
	    "item_id": item_id,
	    "user_id": user_id,
	    "seller": seller,
	    "title": title,
	    "buyer": buyer,
	}

	buyers.append(new_buyer_entry)

	buyers_index = len(buyers)

	for key, value in current_user.items():
		if key == 'buyer':
			value.append(item_id)

	return jsonify(buyers = buyers)

@app.route('/view_item/<item_id>', methods=['GET', 'POST'])
def view_item(item_id):
	item_id = item_id
	if request.method == 'POST':
		return redirect(url_for('item', item_id = item_id))
	return render_template('item.html')

@app.route('/item/<item_id>', methods=['GET', 'POST'])
def item(item_id):
	global current_user
	global items
	global users

	item_id = item_id

	index = int(item_id)

	item = items[index]

	return render_template('item.html', item = item, current_user = current_user, items = items, users = users)
  
@app.route('/update_item/<item_id>', methods=['GET', 'POST'])
def update_item(item_id):

	item_id = int(item_id)
	
	current_item = {}

	for item in items:
		for key, value in item.items():
			if (key == 'item_id'):
				print(type(item_id))
				print(type(value))
				if(item_id == value):
					current_item = item

	return render_template('update_item.html', current_item  = current_item)

@app.route('/update', methods=['GET', 'POST'])
def update():
	global items
	global users
	global current_user

	item_ids = []

	for key, value in current_user.items():
		if (key  == 'items_list'):
			item_ids = value

	return render_template('update.html', current_user = current_user, items = items ) 

@app.route('/requests', methods=['GET', 'POST'])
def requests():
	global current_user
	global items

	buyer_requests   = []

	for key, value  in current_user.items():
		if (key ==  'buyer'):
			buyer_requests = value

	return render_template('requests.html', buyer_requests = buyer_requests, items = items)

@app.route('/remove_request/<item_id>', methods=['GET', 'POST'])
def remove_request(item_id):
	global current_user

	item_id = item_id

	if request.method == 'POST':

		for key, value  in current_user.items():
			if  (key == 'buyer'):
				print(value)
				for request_id in value:
					if (request_id  == item_id):
						value.remove(item_id)
						print(value)

		return redirect(url_for('requests'))
	return render_template('requests.html')

@app.route('/delete/<item_id>', methods=['GET', 'POST'])
def delete(item_id):
	global items

	item_id = int(item_id)

	for item in items:
		for key, value in item.items():
			if (key == 'item_id'):
				if (value == item_id):
					items.remove(item)

	return redirect(url_for('update'))
