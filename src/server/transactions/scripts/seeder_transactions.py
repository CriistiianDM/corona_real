from transactions.models import TypesTransactions, TypesCashRegister

def run():
    # Datos para TypesTransactions
    types_transactions_data = [
        {"name": "Sin Factura", "description": "Transacción en efectivo", "is_active": True},
        {"name": "Factura", "description": "Transacción con tarjeta", "is_active": True},
    ]
    for data in types_transactions_data:
        # Usar `get_or_create` con `name` como filtro único
        TypesTransactions.objects.get_or_create(name=data["name"], defaults=data)

    # Datos para TypesCashRegister
    types_cash_register_data = [
        {"name": "Caja Facturados", "description": "Caja principal Facturados", "is_active": True},
        {"name": "Caja Secundaria", "description": "Caja secundaria del NoFacturados (Efectivo)", "is_active": True},
        {"name": "Caja Productos", "description": "Caja principal mecato y otros productos", "is_active": True},
    ]
    for data in types_cash_register_data:
        # Usar `get_or_create` con `name` como filtro único
        TypesCashRegister.objects.get_or_create(name=data["name"], defaults=data)

    print("Datos iniciales insertados o actualizados con éxito.")
