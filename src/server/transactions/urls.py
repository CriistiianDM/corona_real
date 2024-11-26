from django.urls import path, include
from rest_framework import routers
from .views import TypesTransactionsViewSet, TypesCashRegisterViewSet, CashRegisterViewSet, TransactionsViewSet, RoomReservationsViewSet

router = routers.DefaultRouter()
router.register(r'types_transactions', TypesTransactionsViewSet)
router.register(r'types_cash_register', TypesCashRegisterViewSet)
router.register(r'cash_register', CashRegisterViewSet)
router.register(r'transactions', TransactionsViewSet)
router.register(r'room_reservation', RoomReservationsViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
