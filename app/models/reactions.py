from .db import db


class Reaction(db.Model):
    __tablename__ = 'reactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=False)
    is_helpful = db.Column(db.Boolean, nullable=False)
    is_funny = db.Column(db.Boolean, nullable=False)
    is_salty = db.Column(db.Boolean, nullable=False)

    users = db.relationship('User', back_populates='reactions')
    review = db.relationship('Review', back_populates='reactions')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review_id': self.review_id,
            'is_helpful': self.is_helpful,
            'is_funny': self.is_funny,
            'is_salty': self.is_salty
        }
