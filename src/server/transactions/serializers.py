from rest_framework import serializers
from .models import TypesTransactions, TypesCashRegister, CashRegister, Transactions, RoomReservation

class TypesTransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypesTransactions
        fields = '__all__'

class RoomReservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomReservation
        fields = '__all__'        

class TypesCashRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypesCashRegister
        fields = '__all__'

class CashRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CashRegister
        fields = '__all__'

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = '__all__'
