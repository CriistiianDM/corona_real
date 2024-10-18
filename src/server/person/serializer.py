from restframework import serializers
from .models import TypePerson, Person, Company

class TypePersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypePerson
        fields = 'all'  # O puedes especificar los campos: ['id', 'name', 'description', 'isactive']

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = 'all'  # O puedes especificar los campos según sea necesario

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all'  # O puedes especificar los campos según sea necesario