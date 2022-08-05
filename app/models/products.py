from .db import db
#from sqlalchemy import func // func.now()

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False, unique=True)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(1000))
    weapon_type = db.Column(db.String(50), nullable=False)
    base_damage = db.Column(db.Integer)
    scaling_type = db.Column(db.String(50))
    can_be_buffed = db.Column(db.Boolean)
    posted = db.Column(db.Date)

    users = db.relationship('User', back_populates='products')
    reviews = db.relationship('Review', back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'seller_id':self.seller_id,
            'name': self.name,
            'price':self.price,
            'description':self.description,
            'weapon_type':self.weapon_type,
            'base_damage':self.base_damage,
            'scaling_type':self.scaling_type,
            'can_be_buff':self.can_be_buffed,
            'posted': str(self.posted)
        }
