# Generated by Django 5.1.1 on 2024-11-24 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inventory", "0008_remove_products_type_product_delete_typesproducts"),
    ]

    operations = [
        migrations.AddField(
            model_name="products",
            name="name",
            field=models.CharField(default="prducto", max_length=255),
        ),
    ]
