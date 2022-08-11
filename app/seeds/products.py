from app.models import db, Product
from datetime import datetime

# Adds a demo products
def seed_products():
    demo = Product(
        seller_id=2, name='Longsword', price=1200, description='A basic longsword', weapon_type='straight-sword', base_damage='200', scaling_type='Quality', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/longsword.png'
    )
    fume = Product(
        seller_id=3, name="Fume Ultra-Greatsword", price=4000, description="A colossal weapon once wielded by the Fume Knight. It has more in common with a boulder than a sword.", weapon_type='greatsword', base_damage=430, scaling_type='Strength', can_be_buffed=False, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/fume_ultra_greatsword.png'
    )
    zwei = Product(
        seller_id=2, name="Zweihander", price=3800, description='As the name suggests, the Zweihander is held with two hands, but its weight may require three', weapon_type='greatsword', base_damage='360', scaling_type='Strength', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/zweihander.png'
    )
    plow = Product(
        seller_id=2, name='Four-Pronged Plow', price=400, description='Not originally intended for battle, but serves a deadly weapon owing to its sharp points', weapon_type='Halberd', base_damage=105, scaling_type='Faith', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/four-pronged_plow.png'
    )
    morion = Product(
        seller_id=4, name='Morion Blade', price=4600, description='A twisted sword resembling the towers of Londor\'s Sable Church. Induces heavy bleeding.', weapon_type='Straight-Sword', base_damage=100, scaling_type='Quality', can_be_buffed=False, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/morion_blade.png'
    )
    eGreatsword = Product(
        seller_id=2, name='Exile Greatsword', price=3400, description='Bloodstained Greatsword wielded by one of the Watchdogs of Farron, who preside over the slumber of fallen warriors.', weapon_type='Curved Sword', base_damage=148, scaling_type='Quality', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/exile_greatsword.png'
    )
    lgh = Product(
        seller_id=3, name='Ledo\'s Great Hammer', price=10000, description='Great Hammer wielded by the Silver Knight Ledo. It is by far the heaviest weapon wielded by the knights of Anor Londo.', weapon_type='Hammer', base_damage=170, scaling_type='Strength', can_be_buffed=True, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/ledo's_great_hammer.png"
    )


    db.session.add(demo)
    db.session.add(fume)
    db.session.add(zwei)
    db.session.add(plow)
    db.session.add(morion)
    db.session.add(eGreatsword)
    db.session.add(lgh)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
