from django.urls import path, include
from rest_framework import routers
from .views import TypesTransactionsViewSet, TypesCashRegisterViewSet, CashRegisterViewSet, TransactionsViewSet, RoomReservationsViewSet
# from .views import TransactionsByCashRegister   
from transactions import views
router = routers.DefaultRouter()
router.register(r'types_transactions', TypesTransactionsViewSet)
router.register(r'types_cash_register', TypesCashRegisterViewSet)
router.register(r'cash_register', CashRegisterViewSet)
router.register(r'transactions', TransactionsViewSet)
router.register(r'room_reservation', RoomReservationsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('transactions_by_cash_register/<int:cash_register_id>/', views.TransactionsByCashRegister.as_view()),
   
]
