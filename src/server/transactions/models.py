from django.db import models

class TypesCashRegister(models.Model):
    name = models.TextField()
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class CashRegister(models.Model):
    type_cash_register = models.ForeignKey('TypesCashRegister', on_delete=models.CASCADE)
    cash_balance = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.TextField()
    update_at = models.DateTimeField(auto_now=True)
    create_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.note

class TypesTransactions(models.Model):
    name = models.TextField()
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Transactions(models.Model):
    type_transaction = models.ForeignKey('TypesTransactions', on_delete=models.CASCADE)
    cash_register = models.ForeignKey('CashRegister', on_delete=models.CASCADE)
    description = models.TextField(null=True)
    value = models.IntegerField()
    update_at = models.DateTimeField(auto_now=True)
    create_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.description

class RoomReservation(models.Model):
    reservation = models.ForeignKey('inventory.Reservations', null=True, on_delete=models.CASCADE)
    room = models.ForeignKey('inventory.Rooms', on_delete=models.CASCADE, related_name='updated_reservations')
    update_by = models.ForeignKey('person.Person', on_delete=models.CASCADE,related_name='guest_reservations')
    id_transaction = models.ForeignKey('transactions.Transactions', null=True, on_delete=models.CASCADE,related_name='transaction_id')
    id_guest = models.ForeignKey('person.Person', on_delete=models.CASCADE, null=True)
    occupancy = models.JSONField()
    count_accompany = models.IntegerField()
    date = models.DateTimeField()
    date_finish = models.DateTimeField()
    status = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.count_accompany
