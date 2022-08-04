from app.models import db, Review
from datetime import datetime
now = datetime.now()

# Adds a demo products
def seed_reviews():
    demo1 = Review(
        user_id=1, product_id=1, rating=5, reviewBody='HOLY CRAP I JUST KILLED A GOD(?) WITH THIS??', posted=now
    )
    demo2 = Review(
        user_id=1, product_id=2, rating=1, reviewBody="I can't even lift the stupid thing! 50 Strength?? Seriously???", posted=now
    )
    demo3 = Review(
        user_id=1, product_id=2, rating=3, reviewBody="I love this weapon but everybody uses it, in fact, this jerk with the father mask keeps invading and killing me with it and then doing a stupid pose!", posted=now
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
