# src/server/backend/signals.py

from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_superuser(sender, **kwargs):
    """
    Crea superusuarios por defecto si no existen.
    """
    User = get_user_model()
    users = [
        {"username": "lenincar", "password": "MBg3hZwdHb525qjUw", "email": "lenin@corporation.com"},
    ]

    for u in users:
        if not User.objects.filter(username=u["username"]).exists():
            User.objects.create_superuser(u["username"], u["email"], u["password"])
            print(f'Superuser created: {u["username"]}')
        else:
            print(f'Superuser already exists: {u["username"]}')
