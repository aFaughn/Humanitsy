from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    auditor_id = db.Column(db.Integer, db.ForeignKey('users.auditor_id'), nullable=False)
    auditee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    reviewBody = db.Column(db.String(1000))
    name = db.Column(db.String(30), nullable=False)
    was_killer = db.Column(db.Boolean, nullable=False)
    disconnected = db.Column(db.Boolean, nullable=False)
    posted = db.Column(db.Date, nullable=False)

    users = db.relationship('User', back_populates='reviews')
    reaction = db.relationship('Reaction', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'auditor_id': self.auditor_id,
            'auditee_id': self.auditee_id,
            'rating': self.rating,
            'reviewBody': self.reviewBody,
            'name': self.name,
            'was_killer': self.was_killer,
            'disconnected': self.disconnected,
            'posted': str(self.posted)
        }
