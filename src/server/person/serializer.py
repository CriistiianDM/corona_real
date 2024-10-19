from restframework import serializers
from .models import TypePerson, Person, Company

class TypePersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypePerson
        fields = 'all'

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = 'all'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all'