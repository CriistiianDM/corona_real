# Generated by Django 5.1.1 on 2024-11-14 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("person", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="person",
            name="fecha_expedition",
        ),
        migrations.AddField(
            model_name="person",
            name="lugar_expedicion",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
