from app.models import db, Product
from datetime import datetime

# Adds a demo products
def seed_products():
    demo = Product(
        seller_id=2, name='Longsword', price=1200, description='A basic longsword', weapon_type='straight-sword', base_damage='200', scaling_type='Quality', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls.wiki.fextralife.com/file/Dark-Souls/Longsword.png'
    )
    fume = Product(
        seller_id=3, name="Fume Ultra-Greatsword", price=4000, description="A colossal weapon once wielded by the Fume Knight. It has more in common with a boulder than a sword.", weapon_type='greatsword', base_damage=430, scaling_type='Strength', can_be_buffed=False, posted=datetime.now(), image_url='https://static.wikia.nocookie.net/darksouls/images/9/9d/Fume_Ultra_Greatsword.png'
    )
    zwei = Product(
        seller_id=2, name="Zweihander", price=3800, description='As the name suggests, the Zweihander is held with two hands, but its weight may require three', weapon_type='greatsword', base_damage='360', scaling_type='Strength', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls.wiki.fextralife.com/file/Dark-Souls/zweihander.png'
    )

    db.session.add(demo)
    db.session.add(fume)
    db.session.add(zwei)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
