from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
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
