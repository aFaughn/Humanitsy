from app.models import db, Product
from datetime import datetime

# Adds a demo products
# !!!!CATEGORIES MUST BE PROPERLY CAPITALIZED OR THEY WILL -NOT- SHOW UP IN CATEGORY FILTER!!!!
def seed_products():
    #Straight-Sword
    demo = Product(
        seller_id=2, name='Longsword', price=1200, description='A basic longsword', weapon_type='Straight-Sword', base_damage='200', scaling_type='Quality', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/longsword.png'
    )
    #Greatsword
    fume = Product(
        seller_id=3, name="Fume Ultra-Greatsword", price=4000, description="A colossal weapon once wielded by the Fume Knight. It has more in common with a boulder than a sword.", weapon_type='Greatsword', base_damage=430, scaling_type='Strength', can_be_buffed=False, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/fume_ultra_greatsword.png'
    )
    #Greatsword
    zwei = Product(
        seller_id=2, name="Zweihander", price=3800, description='As the name suggests, the Zweihander is held with two hands, but its weight may require three', weapon_type='Greatsword', base_damage='360', scaling_type='Strength', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/zweihander.png'
    )
    #Halberd
    plow = Product(
        seller_id=2, name='Four-Pronged Plow', price=400, description='Not originally intended for battle, but serves a deadly weapon owing to its sharp points', weapon_type='Halberd', base_damage=105, scaling_type='Faith', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/four-pronged_plow.png'
    )
    #Straight-Sword
    morion = Product(
        seller_id=4, name='Morion Blade', price=4600, description='A twisted sword resembling the towers of Londor\'s Sable Church. Induces heavy bleeding.', weapon_type='Straight-Sword', base_damage=100, scaling_type='Quality', can_be_buffed=False, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/morion_blade.png'
    )
    #Curved-Sword
    eGreatsword = Product(
        seller_id=2, name='Exile Greatsword', price=3400, description='Bloodstained Greatsword wielded by one of the Watchdogs of Farron, who preside over the slumber of fallen warriors.', weapon_type='Curved-Sword', base_damage=148, scaling_type='Quality', can_be_buffed=True, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/exile_greatsword.png'
    )
    #Hammer
    lgh = Product(
        seller_id=3, name='Ledo\'s Great Hammer', price=10000, description='Great Hammer wielded by the Silver Knight Ledo. It is by far the heaviest weapon wielded by the knights of Anor Londo.', weapon_type='Hammer', base_damage=170, scaling_type='Strength', can_be_buffed=True, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/ledo's_great_hammer.png"
    )
    #Bow
    DrB = Product (
        seller_id=3, name='Dragonrider\'s Bow', price=7000, description='Longbow of the Dragonriders, who served the Old King of Want. \n The Dragonriders were the Old King\'s royal guard, and great strength was demanded of them. Merely drawing this bow calls for inhuman strength. The worthy few who can master this bow, however, use it to devastating effect.', weapon_type='Bow', base_damage=110, scaling_type='Dexterity', can_be_buffed=False, posted=datetime.now(), image_url='https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dragonrider_bow.png'
    )
    #Dagger
    AmD = Product (
        seller_id=3, name='Aquamarine Dagger', price=4500, description='A dagger fitted with aquamarine crystal. \n Engraved with a prayer in the old tongue to ward off incident. Perhaps it was a parting gift given to one sent off on great travels.', weapon_type='Dagger', base_damage=67, scaling_type="DEX & INT", can_be_buffed=False, posted=datetime.now(), image_url='https://static.wikia.nocookie.net/darksouls/images/d/df/Aquamarine_Dagger.png/revision/latest?cb=20171103064449'
    )
    #Axe
    DsGa = Product (
        seller_id=1, name='Dragonslayer Greataxe', price=10000, description="Melted iron greataxe that once formed part of the Dragonslayer Armor. \n Thickly imbued with the power of lightning. Use skill to draw upon the techniques used to slay the archdragons.", weapon_type='Axe', base_damage=200, scaling_type='Strength', can_be_buffed=False, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/dragonslayer_greataxe.png"
    )
    #Spear
    Si = Product (
        seller_id=2, name='Soldering Iron', price=2000, description="Branding iron used by the jailers prowling Irithyll Dungeon. \n Press its searing tip against foes to inflict fire damage, and temporarily block Estus healing.", weapon_type='Spear', base_damage=39, scaling_type='Dexterity', can_be_buffed=True, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/soldering_iron.png"
    )
    #Katana
    Uchigatana = Product (
        seller_id=1, name='Uchigatana', price=1200, description="A unique katana characterized by the fine craftsmanship of an eastern land where it was forged. \n The finely-sharpened blade cuts flesh like butter and causes bleeding, but breaks easily as a result.", weapon_type='Katana', base_damage=115, scaling_type='Dexterity', can_be_buffed=True, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/uchigatana.png"
    )
    #Gauntlet
    CrowTalons = Product (
        seller_id=2, name='Crow Talons', price=3000, description="Talons used by Corvian Knights. Inflicts five perpendicular slashes, causing heavy bleeding. \n In their infatuation with Sister Friede, the Corvian Knights swore to protect the painting from fire and to this end, too to the execution of their own brethren.", weapon_type='Gauntlet', base_damage=91, scaling_type='Dexterity', can_be_buffed=True, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/crow_talons_-_final.png"
    )
    #Ring
    FaP = Product (
        seller_id=3, name='Ring of Favor', price=6000, description="A ring symbolizing the favor of the Goddess Fina, whose 'fateful beauty' is mentioned in legend. \n True to the fickle nature of Fina's favor, her ring increases max HP, stamina, and maximum equip load, but shatters if unequipped", weapon_type="Ring", base_damage=1, scaling_type='None', can_be_buffed=False, posted=datetime.now(), image_url="https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/ring_of_favor.png"
    )


    db.session.add(demo)
    db.session.add(fume)
    db.session.add(zwei)
    db.session.add(plow)
    db.session.add(morion)
    db.session.add(eGreatsword)
    db.session.add(lgh)
    db.session.add(DrB)
    db.session.add(AmD)
    db.session.add(DsGa)
    db.session.add(Si)
    db.session.add(Uchigatana)
    db.session.add(CrowTalons)
    db.session.add(FaP)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
