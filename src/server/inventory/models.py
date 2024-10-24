from django.db import models
from person.models import Person
from transactions.models import Transactions

class TypesProducts(models.Model):
    name = models.TextField()
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.name

class Products(models.Model):
    type_product = models.ForeignKey('TypesProducts', on_delete=models.CASCADE)
    update_by = models.IntegerField()
    stock = models.IntegerField()
    price = models.IntegerField()
    inv = models.IntegerField()
    update_at = models.DateTimeField(auto_now=True)
    create_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.update_by

class SellerProducts(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    product = models.ForeignKey('Products', on_delete=models.CASCADE)
    transaction_id = models.ForeignKey(Transactions, on_delete=models.CASCADE, default=1)
    transacted = models.IntegerField()
    date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.product

class Reservations(models.Model):
    note = models.CharField(max_length=200)
    date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.note

class Rooms(models.Model):
    number_room = models.IntegerField()
    type_room = models.CharField(max_length=10, choices=[('sencilla', 'Sencilla'), ('doble', 'Doble')])
    name = models.CharField(max_length=200)
    update_at = models.DateTimeField(auto_now=True)
    create_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def str(self):
        return self.name