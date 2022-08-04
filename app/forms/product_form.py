from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DateField, BooleanField
from wtforms.validators import DataRequired

#While certainly possible to add every dark souls weapon type - some have been omitted for brevity
WEAPON_TYPES = ['greatsword',
                'straight-sword',
                'bow',
                'dagger',
                'halberd',
                'hammer',
                'gauntlet',
                'axe',
                'spear',
                'katana',
                'curved-sword',
                'whip',
                'throwable']

SCALING_TYPES = [
    'Dexterity',
    'Strength',
    'Quality',
    'Intelligence',
    'Faith',
    'DEX & FAI',
    'DEX & INT',
    'All'
]


#No backend validators - All validation will be done on the front-end
class NewProductForm(FlaskForm):
    seller_id = IntegerField('sellerId')
    name = StringField('Name')
    price = IntegerField('Price')
    description = StringField('Description')
    weapon_type = SelectField('Weapon Type', choices=WEAPON_TYPES)
    base_damage = IntegerField('Base Damage')
    scaling_type = SelectField('Highest Scaling Stat', choices=SCALING_TYPES)
    can_be_buffed = BooleanField('Buffable?')
    posted = DateField('Date')
