from django.urls import path, include
from rest_framework import routers
from .views import TypePersonSerializerViewSet, PersonSerializerViewSet, CompanySerializerViewSet

router = routers.DefaultRouter()
router.register(r'types_person', TypePersonSerializerViewSet)
router.register(r'person', PersonSerializerViewSet)
router.register(r'company', CompanySerializerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]