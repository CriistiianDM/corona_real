import json

from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST, require_GET
from decouple import config
from .models import Person, TypePerson
from django.contrib.auth.models import User
from django.utils import timezone
from django.forms.models import model_to_dict
from django.db.models import Q

DJANGO_TOKEN_KEY = config('DJANGO_TOKEN_KEY')

@csrf_exempt
@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            try:
                person = Person.objects.get(person_auth=user)
                person_data = model_to_dict(person, exclude=['person_auth'])
                
                return JsonResponse({
                    'status': True,
                    'message': 'Login successful.',
                    'user': person_data
                })
            except Person.DoesNotExist:
                return JsonResponse({'status': False, 'message': 'Person data not found.'})
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

@csrf_exempt
@require_POST
def post_create_accounts(request):
    try:
        data = json.loads(request.body)
        name = data.get('name')
        username = data.get('username')
        password = data.get('password')
        type_person = data.get('type_person')
        identification = data.get('identification')
        fecha_expedition = data.get('fecha_expedition')
        type_person_id = data.get('type_person') 

        if type_person_id in [1, 2]:
            user = User.objects.create_user(username=username, password=password)
            person_auth = user
        else:
            person_auth = None

        type_person = TypePerson.objects.get(id=type_person_id)
        company = None

        person = Person.objects.create(
            person_auth=person_auth,
            type_person=type_person,
            company=company,
            name=name,
            identification=identification,
            fecha_expedition=fecha_expedition,
            update_at=timezone.now(),
            created_at=timezone.now(),
            is_active=True
        )

        person_data = model_to_dict(person)

        return JsonResponse({'status': True, 'data': person_data, 'message': 'Person created successfully.'})
    except json.JSONDecodeError:
        return JsonResponse({'status': False, 'message': 'Invalid JSON.'}, status=400)
    except TypePerson.DoesNotExist:
        return JsonResponse({'status': False, 'message': 'TypePerson not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)}, status=500)

@require_POST
def get_person_by_name_or_identification(request):
    try:
        data = json.loads(request.body)
        name = data.get('name', '')
        identification = data.get('identification', '')

        if not name and not identification:
            return JsonResponse({'status': False, 'message': 'You must provide either a name or an identification.'}, status=400)

        filters = Q()
        if name:
            filters &= Q(name__icontains=name)
        if identification:
            filters &= Q(identification=identification)

        persons = Person.objects.filter(filters, is_active=True)
        persons_data = [model_to_dict(person) for person in persons]

        if persons_data:
            return JsonResponse({'status': True, 'data': persons_data, 'message': 'Success'})
        else:
            return JsonResponse({'status': False, 'message': 'No persons found matching the criteria.'}, status=404)
    
    except json.JSONDecodeError:
        return JsonResponse({'status': False, 'message': 'Invalid JSON format.'}, status=400)
    
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)}, status=500)


@require_GET
def get_person_by_type(request):
    try:
        type_person_id = request.GET.get('type_person_id')
        if not type_person_id:
            return JsonResponse({'status': False, 'message': 'type_person_id is required.'}, status=400)
        
        type_person_id = int(type_person_id)
        
        try:
            type_person = TypePerson.objects.get(id=type_person_id)
        except TypePerson.DoesNotExist:
            return JsonResponse({'status': False, 'message': 'TypePerson not found.'}, status=404)
        
        persons = Person.objects.filter(type_person=type_person)
        persons_data = [model_to_dict(person) for person in persons]

        return JsonResponse({'status': True, 'data': persons_data, 'message': 'Persons filtered by type.'})

    except ValueError:
        return JsonResponse({'status': False, 'message': 'Invalid type_person_id.'}, status=400)
    except Exception as e:
        return JsonResponse({'status': False, 'message': str(e)}, status=500)