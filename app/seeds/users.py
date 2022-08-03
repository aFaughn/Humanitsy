from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    andre = User(
        username='Andre of Astora', email='andre@andre.com', password='password', tagline='Prithee be careful')
    blacksmith_giant = User(
        username='Forge your weapons?', email='giant@giant.com', password='password', tagline='Forge I can, Strong I am!')
    vamos = User(
        username='Blacksmith Vamos', email='vamos@vamos.com', password='password', tagline='Buy something before you spoil my focus.')

    db.session.add(demo)
    db.session.add(andre)
    db.session.add(blacksmith_giant)
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
