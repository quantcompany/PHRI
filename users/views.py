from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from custom_user.forms import EmailUserCreationForm

from .models import User 


def landing(request, *args, **kwargs):
    return render(request, 'users/landing.html')


@require_http_methods(['POST'])
def login_view(request):
    email = request.POST.get('email', 'none')
    password = request.POST.get('password', 'none')

    user = authenticate(username=email, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({})
    else:
        return JsonResponse({'error': 'Invalid email and/or password'}, status=401)


@require_http_methods(['POST'])
def register(request):
    form = EmailUserCreationForm(request.POST)
    if form.is_valid():
        new_user = form.save()
        return JsonResponse({}, status=200)
    else:
        return JsonResponse(form.errors, status=400)


def me(request):
    return JsonResponse(request.user.as_dict())


def exists(request):
    email = request.GET.get('email')
    if User.objects.filter(email=email).exists():
        return JsonResponse({})
    else:
        return JsonResponse({}, status=404)