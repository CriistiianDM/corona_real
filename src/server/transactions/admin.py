from django.contrib import admin
from .models import TypesTransactions, TypesCashRegister, CashRegister, Transactions

admin.site.register(TypesTransactions)
admin.site.register(TypesCashRegister)
admin.site.register(CashRegister)
admin.site.register(Transactions)
