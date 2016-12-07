import uuid

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.sites.shortcuts import get_current_site

from emails import send_verification_email

from .models import User, EmailVerification, PracticeType
from .forms import RegistrationForm, ProfileForm
from .choices import COUNTRY_CHOICES, SPECIALTY_CHOICES


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
        new_user.is_active = False # will not be active until email address is verified

        new_user.guess_user_name()
        new_user.save() # redundant. guess_user_name() already saves. but...

        code = str(uuid.uuid4())
        while EmailVerification.objects.filter(code=code).exists():
            code = str(uuid.uuid4())

        verification = new_user.verifications.create(code=code)
        send_verification_email(verification, site=get_current_site(request))

        email = form.cleaned_data['email']
        password = form.cleaned_data['password1']

        # will not be active until email address is verified
        # new_user = authenticate(username=email, password=password)
        # login(request, new_user)
        return JsonResponse({}, status=200)
    else:
        return JsonResponse(form.errors, status=400)


@require_http_methods(['GET', 'POST'])
@login_required
def me(request):
    if request.method == 'GET':
        context = {
            'countries': COUNTRY_CHOICES,
            'specialties': SPECIALTY_CHOICES,
            'practices': PracticeType.objects.all()
        }
        return render(request, 'users/my_profile.html', context)
    elif request.method == 'POST':
        form = ProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()

            if form.cleaned_data.get('change_password') == True:
                new_password = form.cleaned_data.get('new_password2')
                request.user.set_password(new_password)
                request.user.save()
                login(request, request.user)
                messages.success(request, 'Profile details updated.')
                resp = JsonResponse({}, status=303) # refresh
                return resp
            else:
                messages.success(request, 'Profile details updated.')
                return JsonResponse({}, status=200) # ok
        else:
            return JsonResponse(form.errors, status=400) # validation errors

# @login_required
# def profile(request, user_id):
#     context = {'countries': COUNTRY_CHOICES}
#     return render(request, 'users/profile.html', context)


def exists(request):
    email = request.GET.get('email')
    if User.objects.filter(email=email).exists():
        return JsonResponse({})
    else:
        return JsonResponse({}, status=404)


def verify(request, code):
    try:
        verification = EmailVerification.objects.get(code=code)
        user = verification.user
        user.is_active = True
        user.save()
        return render(request, 'email_verification/verified.html')
    except EmailVerification.DoesNotExist:
        return render(request, 'email_verification/error.html')

def verification_sent(request):
    return render(request, 'email_verification/sent.html')
