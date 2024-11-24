from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductsViewSet, SellerProductsViewSet, ReservationsViewSet, RoomsViewSet
# ,TypesProductsViewSet

router = DefaultRouter()
# router.register(r'types-products', TypesProductsViewSet)
router.register(r'products', ProductsViewSet)
router.register(r'seller-products', SellerProductsViewSet)
router.register(r'reservations', ReservationsViewSet)
router.register(r'rooms', RoomsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]