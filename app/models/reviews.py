from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    reviewBody = db.Column(db.String(1000))
    posted = db.Column(db.Date, nullable=False)

    users = db.relationship('User', back_populates='reviews')
    products = db.relationship('Product', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id':self.user_id,
            'product_id':self.product_id,
            'rating': self.rating,
            'reviewBody': self.reviewBody,
            'posted': str(self.posted)
        }
