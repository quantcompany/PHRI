from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import User 
from .forms import RegistrationForm
from .choices import COUNTRY_CHOICES

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


def logout_view(request):
    logout(request)
    return redirect('landing')


@require_http_methods(['POST'])
def register(request):
    form = RegistrationForm(request.POST)

    if form.is_valid():
        new_user = form.save(commit=False)
        new_user.first_name = form.cleaned_data['first_name']
        new_user.last_name = form.cleaned_data['last_name']
        new_user.institution = form.cleaned_data['institution']

        new_user.guess_user_name()
        new_user.save() # redundant. guess_user_name() already saves. but...

        email = form.cleaned_data['email']
        password = form.cleaned_data['password1']
        
        new_user = authenticate(username=email, password=password)

        login(request, new_user)
        
        return JsonResponse({}, status=200)
    else:
        return JsonResponse(form.errors, status=400)


def me(request):
    context = {'countries': COUNTRY_CHOICES}
    return render(request, 'users/my_profile.html', context)


def profile(request, user_id):
    context = {'countries': COUNTRY_CHOICES}
    return render(request, 'users/profile.html', context)


def exists(request):
    email = request.GET.get('email')
    if User.objects.filter(email=email).exists():
        return JsonResponse({})
    else:
        return JsonResponse({}, status=404)