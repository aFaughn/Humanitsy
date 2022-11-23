"""empty message

Revision ID: 334e9c605a78
Revises: 5a5fe7fcb1ce
Create Date: 2022-08-13 13:31:58.371274

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '334e9c605a78'
down_revision = '5a5fe7fcb1ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'posted',
               existing_type=sa.DATE(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'posted',
               existing_type=sa.DATE(),
               nullable=True)
    # ### end Alembic commands ###
