from app.models import db, Product
import datetime

# Adds a demo user, you can add other users here if you want
def seed_products():
    demo = Product(
        seller_id=1, name='Longsword', price=100, description='A basic longsword', weapon_type='straight-sword', base_damage='200', scaling_type='Quality', can_be_buffed=True
    )

    db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
