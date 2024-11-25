from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.
class TypePerson(models.Model):
    name = models.TextField()
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.name

class Person(models.Model):
    person_auth = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)

    type_person = models.ForeignKey('TypePerson', null=False, on_delete=models.CASCADE, unique=False)
    company = models.ForeignKey('Company', null=True, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)
    identification = models.IntegerField()
    lugar_expedicion = models.CharField(max_length=255, null=True, blank=True)

    update_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(default=timezone.now)

    is_active = models.BooleanField(default=True)

    def str(self):
        return self.name
    
class Company(models.Model):
    name = models.CharField(max_length=255)
    nit = models.IntegerField()
    date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.name