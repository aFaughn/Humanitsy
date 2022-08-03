from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# reviews = db.Table('reviews',
#     db.Model.metadata,
#     db.Column('auditor', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('auditee', db.Integer, db.ForeignKey('users.id'), primary_key=True))


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    preferred_role = db.Column(db.String(8), nullable=False)
    favorite_survivor = db.Column(db.String(30))
    favorite_killer = db.Column(db.String(30))
    hours = db.Column(db.Integer)

    reactions = db.relationship('Reaction', back_populates='users', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'preferred_role': self.preferred_role,
            'favorite_survivor': self.favorite_survivor,
            'favorite_killer': self.favorite_killer,
            'hours': self.hours
        }
