import logging
from flask import render_template, Response, request, jsonify, redirect, url_for
from app import app
from app.methods import get_index, get_value, set_value, add_to_list, add_data, delete_data, search
from app.buyers import buyers, buyers_index, buyers_search_items
from app.items import items, items_index
from app.users import users, users_index, current_user
from app.sellers import sellers_search_items

@app.route('/home', methods=['GET', 'POST'])
def home():
	return render_template('home.html')

@app.route('/sell', methods=['GET', 'POST'])
def sell():
	global items
	global current_user
	return render_template('sell.html', current_user = current_user, items = items ) 

@app.route('/cart', methods=['GET', 'POST'])
def cart():
	global current_user
	global items

	cart_items = get_value(current_user, 'buyer')

	return render_template('cart.html', cart_items = cart_items, items = items)

@app.route('/buy', methods=['GET', 'POST'])
def buy():
	global items
	global current_user
	global users
	global buyers_search_items

	if request.method == 'POST':

		search(buyers_search_items)

		return jsonify(buyers_search_items = buyers_search_items)
	else:
		return render_template('buy.html', items = items, current_user = current_user, users = users, buyers_search_items = buyers_search_items)

@app.route('/add_item', methods=['GET', 'POST'])
def add_item():
	global items_index
	global current_user
	global items

	items_index = get_index(items)

	if request.method == 'POST':
		add_data(items_index)
		return jsonify(items = items)
	else:
		return render_template('add_item.html', items_index = items_index)

@app.route('/add_to_cart', methods=['GET', 'POST'])
def add_to_cart():
	global buyers
	global buyers_index

	json_data = request.get_json()
	item_id = json_data["item_id"]
	user_id = json_data["user_id"]
	seller = json_data["seller"]
	title = json_data["title"]

	buyer = get_value(current_user, 'user')

	new_buyer_entry = {
	    "item_id": item_id,
	    "user_id": user_id,
	    "seller": seller,
	    "title": title,
	    "buyer": buyer,
	}
	add_to_list(buyers, new_buyer_entry, len(buyers))

	set_value(current_user, 'buyer', item_id)

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

	item_id = item_id
	
	current_item = {}

	for item in items:
		for key, value in item.items():
			if (key == 'item_id'):
				if(item_id == str(value)):
					current_item = item

	if request.method == 'POST':
		add_data(item_id)

		return jsonify(items = items)
	else:
		return render_template('update_item.html', current_item  = current_item)

@app.route('/remove_from_cart/<item_id>', methods=['GET', 'POST'])
def remove_from_cart(item_id):
	global current_user
	global buyers

	if request.method == 'POST':

		delete_data(current_user, 'buyer', buyers, item_id)

		return redirect(url_for('cart'))
	return render_template('cart.html')

@app.route('/delete/<item_id>', methods=['GET', 'POST'])
def delete(item_id):
	global current_user
	global items

	print(items[int(item_id)])

	delete_data(current_user, 'items_list', items, item_id)

	print(items[int(item_id)])

	return redirect(url_for('sell'))
