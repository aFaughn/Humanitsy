from flask import Blueprint, redirect, request
from app.forms.product_form import NewProductForm
from app.models import Product, db
from app.models.user import User

product_router = Blueprint('products',__name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages=[]
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

#GET all Products
@product_router.route('/')
def all_products():
    products = Product.query.all()
    return products.to_dict()
