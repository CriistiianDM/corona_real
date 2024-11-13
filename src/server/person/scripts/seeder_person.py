# inventory/scripts/seeder_person.py

from person.models import Person, Company, TypePerson
from datetime import datetime

def run():
    # Datos para Person
    person_data = [
        {
            "name": "William",
            "identification": 113244242,
            "fecha_expedition": datetime(2021, 7, 20, 14, 45)
        },
        {
            "name": "Luna",
            "identification": 11833311,
            "fecha_expedition": datetime(2022, 5, 21, 14, 45)
        },

    ]
    for data in person_data:
        Person.objects.get_or_create(name=data["name"], defaults=data)


    #Datos para Company
    person_company = [
        {
            "name": "Alberto",
            "nit": 112122,
            "date": datetime(2024, 7, 2, 13, 55),
            "is_active": True
        },
        {
            "name": "Juan",
            "nit": 244421,
            "date": datetime(2024, 1, 3, 8, 50),
            "is_active": True
        }
    ]
    for data in person_company:
        Company.objects.get_or_create(name=data["name"], defaults=data)

    #Datos para type_person

    person_typeperson = [
        {
            "name": "Alberto",
            "description": "Recepcionista",
            "is_active": True
        },
        {
            "name": "Juan",
            "description": "Gerente",
            "is_active": True
        }
    ]
    for data in person_typeperson:
        TypePerson.objects.get_or_create(name=data["name"], defaults=data)




