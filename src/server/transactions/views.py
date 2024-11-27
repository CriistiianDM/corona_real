from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView  # Asegúrate de incluir esta línea
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import TypesTransactions, TypesCashRegister, CashRegister, Transactions, RoomReservation
from .serializers import (
    TypesTransactionsSerializer, 
    TypesCashRegisterSerializer, 
    CashRegisterSerializer, 
    TransactionsSerializer,
    RoomReservationsSerializer
)

# @method_decorator(csrf_protect, name='dispatch')
class TypesTransactionsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = TypesTransactions.objects.all()
    serializer_class = TypesTransactionsSerializer

# @method_decorator(csrf_protect, name='dispatch')
class TypesCashRegisterViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = TypesCashRegister.objects.all()
    serializer_class = TypesCashRegisterSerializer

# @method_decorator(csrf_protect, name='dispatch')
class CashRegisterViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = CashRegister.objects.all().order_by('id')
    serializer_class = CashRegisterSerializer

# @method_decorator(csrf_protect, name='dispatch')
class TransactionsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer

class RoomReservationsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = RoomReservation.objects.all()
    serializer_class = RoomReservationsSerializer

class TransactionsByCashRegister(APIView):
    def get(self, request, cash_register_id=None):
        try:
            if not cash_register_id:
                return Response(
                    {"error": "El parámetro 'cash_register_id' es obligatorio."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Filtra las transacciones por el ID de la caja registradora
            transactions = Transactions.objects.filter(cash_register_id=cash_register_id, is_active=True)

            if not transactions.exists():
                return Response(
                    {"message": "No se encontraron transacciones para la caja registradora especificada."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = TransactionsSerializer(transactions, many=True)  # Serializa la consulta
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
