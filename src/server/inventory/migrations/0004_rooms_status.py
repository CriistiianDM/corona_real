# Generated by Django 5.1.1 on 2024-10-30 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_sellerproducts_transaction_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='rooms',
            name='status',
            field=models.CharField(choices=[('ocupado', 'Ocupado'), ('disponible', 'Disponible'), ('sucio', 'Sucio'), ('averiada', 'Averiada')], default='disponible', max_length=20),
        ),
    ]
