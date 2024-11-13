#from django.shortcuts import render
# Create your views here.
from rest_framework import viewsets
from .models import TypePerson, Person, Company
from .serializer import(
    TypePersonSerializer,
    PersonSerializer,
    CompanySerializer
)

class TypePersonSerializerViewSet(viewsets.ModelViewSet):
    queryset=TypePersonSerializer.objects.all()
    serializer_class = TypePerson


class PersonSerializerViewSet(viewsets.ModelViewSet):
    queryset=PersonSerializer.objects.all()
    serializer_class = Person


class CompanySerializerViewSet(viewsets.ModelViewSet):
    queryset=CompanySerializer.objects.all()
    serializer_class = Company







