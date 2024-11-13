from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('accounts/', views.post_create_accounts, name='account'),
    path('filter_name_identification/', views.get_person_by_name_or_identification, name='filter_name_identification'),
    path('get_person_by_type/', views.get_person_by_type, name='person_by_type'),
    path('____/', views.get_csrf_token, name='token'),
]
