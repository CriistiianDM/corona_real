# Generated by Django 5.1.1 on 2024-11-17 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inventory", "0005_remove_rooms_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="products",
            name="image_url",
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
