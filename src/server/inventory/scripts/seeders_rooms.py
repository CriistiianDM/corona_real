# inventory/scripts/seed_rooms.py

from inventory.models import Rooms

def run():
    rooms_data = [
        # 301 a 308 sencillas
        {"number_room": num, "type_room": Rooms.SENCILLA} for num in range(301, 309)
    ] + [
        # 401 a 404 sencillas
        {"number_room": num, "type_room": Rooms.SENCILLA} for num in range(401, 405)
    ] + [
        # 405 y 406 dobles
        {"number_room": 405, "type_room": Rooms.DOBLE},
        {"number_room": 406, "type_room": Rooms.DOBLE},
    ] + [
        # 407 y 408 sencillas
        {"number_room": 407, "type_room": Rooms.SENCILLA},
        {"number_room": 408, "type_room": Rooms.SENCILLA},
    ] + [
        # 501 a 506 sencillas
        {"number_room": num, "type_room": Rooms.SENCILLA} for num in range(501, 507)
    ]

    for room_data in rooms_data:
        # Usar get_or_create con number_room como filtro único para evitar duplicados
        room, created = Rooms.objects.get_or_create(number_room=room_data["number_room"], defaults=room_data)
        if created:
            print(f"Habitación creada: {room.number_room}")
        else:
            print(f"Habitación existente: {room.number_room}")

    print("Datos de habitaciones insertados con éxito.")
