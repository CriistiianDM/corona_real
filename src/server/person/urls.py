from django.urls import path, include
from rest_framework import routers
from . import views 

router = routers.DefaultRouter()
router.register(r'types_person', views.TypePersonSerializerViewSet)
router.register(r'person', views.PersonSerializerViewSet)
router.register(r'company',views.CompanySerializerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_view, name='login'),
    path('accounts/', views.post_create_accounts, name='account'),
    path('filter_name_identification/', views.get_person_by_name_or_identification, name='filter_name_identification'),
    path('get_person_by_type/', views.get_person_by_type, name='person_by_type'),
    path('____/', views.get_csrf_token, name='token'),
]
