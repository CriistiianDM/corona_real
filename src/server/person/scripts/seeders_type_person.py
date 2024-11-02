from person.models import TypePerson

def run():
    type_person_data = [
        {"name": "admin", "description": "Administrator role", "is_active": True},
        {"name": "recepcionista", "description": "Receptionist role", "is_active": True},
    ]

    for type_data in type_person_data:
        # Usar get_or_create para evitar duplicados basados en el nombre del tipo de persona
        type_person, created = TypePerson.objects.get_or_create(name=type_data["name"], defaults=type_data)
        if created:
            print(f"Tipo de persona creado: {type_person.name}")
        else:
            print(f"Tipo de persona existente: {type_person.name}")

    print("Datos de tipos de persona insertados con éxito.")
