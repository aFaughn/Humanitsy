from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='Andre of Astora', email='marnie@aa.io', password='password', image_url='static.wikia.nocookie.net/darksouls/images/5/5c/Andre_%282%29.jpg' ,tagline='Prithee be careful')
    bobbie = User(
        username='Giant Blacksmith', email='bobbie@aa.io', password='password', image_url='darksouls.wiki.fextralife.com/file/Dark-Souls/giant_blacksmith_header_full.jpg', tagline='Forge I can, Strong I am!')
    vamos = User(
        username='Vamos The Undead Smithy', email='vamos@aa.io', password='password', image_url='static.wikia.nocookie.net/darksouls/images/0/03/Vamos.jpg' ,tagline="Buy something, before you spoil my focus!"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(vamos)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
