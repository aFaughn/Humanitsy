from flask import Blueprint, redirect, request, render_template
from app.forms.product_form import NewProductForm
from app.models import Product, db
from app.models.user import User
from sqlalchemy import func

category_router = Blueprint('cat',__name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages=[]
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages

#GET all products matching their category
@category_router.route('/<cat_type>')
def categorizedProduct(cat_type):
    product = Product.query.filter_by(weapon_type=cat_type).all()
    #Needed to append the .all() as well as call to_dict() on the actual Model Obj and no the list returned by the query.
    return {"products": [prod.to_dict() for prod in product] }
