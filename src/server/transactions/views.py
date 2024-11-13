from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets
from .models import TypesTransactions, TypesCashRegister, CashRegister, Transactions
from .serializers import (
    TypesTransactionsSerializer, 
    TypesCashRegisterSerializer, 
    CashRegisterSerializer, 
    TransactionsSerializer
)

@method_decorator(csrf_protect, name='dispatch')
class TypesTransactionsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = TypesTransactions.objects.all()
    serializer_class = TypesTransactionsSerializer

@method_decorator(csrf_protect, name='dispatch')
class TypesCashRegisterViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = TypesCashRegister.objects.all()
    serializer_class = TypesCashRegisterSerializer

@method_decorator(csrf_protect, name='dispatch')
class CashRegisterViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = CashRegister.objects.all()
    serializer_class = CashRegisterSerializer

@method_decorator(csrf_protect, name='dispatch')
class TransactionsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
