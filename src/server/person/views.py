import json

from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from decouple import config

DJANGO_TOKEN_KEY = config('DJANGO_TOKEN_KEY')

@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({'status': True, 'message': 'Login successful.'})
        else:
            return JsonResponse({'status': False, 'message': 'Invalid username or password.'})
        
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)


@csrf_exempt
@require_POST
def get_csrf_token(request):
    try:
        data = json.loads(request.body)
        key = data.get('key')

        if key == DJANGO_TOKEN_KEY:
            csrf_token = get_token(request)
            return JsonResponse({'token': csrf_token})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid key.'}, status=403)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)