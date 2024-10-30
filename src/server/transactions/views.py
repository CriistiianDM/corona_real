# Create your views here.
from rest_framework import viewsets
from .models import TypesTransactions, TypesCashRegister, CashRegister, Transactions
from .serializers import (
    TypesTransactionsSerializer, 
    TypesCashRegisterSerializer, 
    CashRegisterSerializer, 
    TransactionsSerializer
)

class TypesTransactionsViewSet(viewsets.ModelViewSet):
    queryset = TypesTransactions.objects.all()
    serializer_class = TypesTransactionsSerializer

class TypesCashRegisterViewSet(viewsets.ModelViewSet):
    queryset = TypesCashRegister.objects.all()
    serializer_class = TypesCashRegisterSerializer

class CashRegisterViewSet(viewsets.ModelViewSet):
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer

class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
