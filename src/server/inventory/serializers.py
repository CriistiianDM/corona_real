from rest_framework import serializers
from .models import TypesProducts, Products, SellerProducts, Reservations, Rooms

class TypesProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypesProducts
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class SellerProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerProducts
        fields = '__all__'

class ReservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservations
        fields = '__all__'

class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = '__all__'
