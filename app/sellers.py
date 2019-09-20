from seed import users

sellers = []

sellers_search_items = []

sellers_index = 0

def initiate_sellers():
    for user in users:
    	for key, value  in user.items():
    		if key == 'items_list':
    			if value:
    				for key, value in user.items():
    					if key == 'user_id':
    						sellers.append(value)