from flask import Blueprint, redirect, render_template, request
from app.models import db, Review
from app.forms.review_form import ReviewForm
from datetime import datetime

review_router = Blueprint('reviews',__name__)

now = datetime.now()

#GETs all reviews by every user for every product and converts them to a dictionary
@review_router.route('/all')
def get_reviews():
    reviews = Review.query.all()
    all_reviews = [review.to_dict() for review in reviews]
    return {'reviews': all_reviews}

#POSTs a new review tied to a product and userId
@review_router.route('/new', methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        review = Review(
            user_id = form.data['user_id'],
            product_id = form.data['product_id'],
            review_body = form.data['review_body'],
            rating = form.data['rating'],
            posted = now
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

#PUTs updated review contents by Id
@review_router.route('/<id>/edit', methods=['PUT'])
def edit_review(id):
    form = ReviewForm()
    review = Review.query.get(id)
    review.review_body = form.data['review_body']
    review.rating = form.data['rating']
    db.session.commit()
    return review.to_dict()

#DELETEs a review by reviewId
@review_router.route('/<id>/delete', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
