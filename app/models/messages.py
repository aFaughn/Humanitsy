from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(500))
    time_sent = db.Column(db.Time)

    sender = db.relationship('User', foreign_keys='[Message.sender_id]', back_populates='messages')
    recipient = db.relationship('User', foreign_keys='[Message.recipient_id]', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'recipient_id': self.recipient_id,
            'sender_id': self.sender_id,
            'body': self.body,
            'time_sent': str(self.time_sent)
        }
