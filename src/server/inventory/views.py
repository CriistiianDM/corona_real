from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from rest_framework import viewsets
from .models import  Products, SellerProducts, Reservations, Rooms
# , TypesProducts
from .serializers import ProductsSerializer, SellerProductsSerializer, ReservationsSerializer, RoomsSerializer
# ,TypesProductsSerializer

# @method_decorator(csrf_protect, name='dispatch')
# class TypesProductsViewSet(viewsets.ModelViewSet):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#     queryset = TypesProducts.objects.all()
#     serializer_class = TypesProductsSerializer

# @method_decorator(csrf_protect, name='dispatch')
class ProductsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Products.objects.all().order_by('id')
    serializer_class = ProductsSerializer

# @method_decorator(csrf_protect, name='dispatch')
class SellerProductsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = SellerProducts.objects.all()
    serializer_class = SellerProductsSerializer

# @method_decorator(csrf_protect, name='dispatch')
class ReservationsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Reservations.objects.all()
    serializer_class = ReservationsSerializer

# @method_decorator(csrf_protect, name='dispatch')
class RoomsViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Rooms.objects.all().order_by('id')
    serializer_class = RoomsSerializer
