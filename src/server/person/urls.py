from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('accounts/', views.post_create_accounts, name='account'),
    path('____/', views.get_csrf_token, name='token'),
]
