from django.contrib import admin
from .models import TypePerson, Person, Company

# Register your models here.

admin.site.register(TypePerson)
admin.site.register(Person)
admin.site.register(Company)
