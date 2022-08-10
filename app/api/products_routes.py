from flask import Blueprint, redirect, request, render_template
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
@product_router.route('')
def getAllProducts():
    products = Product.query.all()
    productsObj = [{
        'id': product.id,
        'seller_id': product.seller_id,
        'name': product.name,
        'price': product.price,
        'description': product.description,
        'weapon_type': product.weapon_type,
        'base_damage': product.base_damage,
        'scaling_type': product.scaling_type,
        'can_be_buffed':product.can_be_buffed,
        'image_url': product.image_url,
        'posted': str(product.posted)
    } for product in products]
    return {'products':productsObj}

#GET - Get the new product Form
#POST - Create new product
@product_router.route('/new', methods=['GET','POST'])
def new_product():
    form = NewProductForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            seller_id = form.data['seller_id'],
            name = form.data['name'],
            price = form.data['price'],
            description = form.data['description'],
            weapon_type = form.data['weapon_type'],
            base_damage = form.data['base_damage'],
            scaling_type = form.data['scaling_type'],
            can_be_buffed = form.data['can_be_buffed'],
            image_url = form.data['image_url'],
        )
    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    db.session.add(product)
    db.session.commit()
    return product.to_dict()

#GET an individual product's details
@product_router.route('/<productId>')
def singleProduct(productId):
    product = Product.query.get(productId)
    return product.to_dict()

#DELETEs an individual product
@product_router.route('/<productId>/delete', methods=['DELETE'])
def deleteProduct(productId):
    product = Product.query.get(productId)
    db.session.delete(product)
    db.session.commit()
    return product.to_dict()


#PUT updated info to a product
@product_router.route('/<productId>/edit', methods=['PUT'])
def editProduct(productId):
    product = Product.query.get(productId)
    form= NewProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        product.name= form.data['name']
        product.price = form.data['price']
        product.description = form.data['description']
        product.weapon_type = form.data['weapon_type']
        product.base_damage = form.data['base_damage']
        product.scaling_type = form.data['scaling_type']
        product.can_be_buffed = form.data['can_be_buffed']

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    db.session.commit()

    return product.to_dict()


#Test route
@product_router.route('/test')
def all_products_test():
    products = Product.query.all()
    product_dict = products[0].to_dict()
    return render_template('allProducts.html', products=product_dict)
