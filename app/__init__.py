from flask import Flask

app = Flask(__name__)

from app.buyers import buyers, buyers_index
from app.items import items, items_index
from app.users import users, users_index
from app.sellers import sellers, sellers_index, initiate_sellers
from app.methods  import get_index

initiate_sellers()

users_index = get_index(users)
sellers_index = get_index(sellers)
items_index = get_index(items)
