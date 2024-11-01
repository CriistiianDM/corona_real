from django.shortcuts import render

from rest_framework import viewsets
from .models import TypesProducts, Products, SellerProducts, Reservations, Rooms
from .serializers import TypesProductsSerializer, ProductsSerializer, SellerProductsSerializer, ReservationsSerializer, RoomsSerializer


class TypesProductsViewSet(viewsets.ModelViewSet):
    queryset = TypesProducts.objects.all()
    serializer_class = TypesProductsSerializer


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer


class SellerProductsViewSet(viewsets.ModelViewSet):
    queryset = SellerProducts.objects.all()
    serializer_class = SellerProductsSerializer


class ReservationsViewSet(viewsets.ModelViewSet):
    queryset = Reservations.objects.all()
    serializer_class = ReservationsSerializer

class RoomsViewSet(viewsets.ModelViewSet):
    queryset = Rooms.objects.all()
    serializer_class = RoomsSerializer
