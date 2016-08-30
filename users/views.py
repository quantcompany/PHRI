from django.shortcuts import render

def landing(request, *args, **kwargs):
    return render(request, 'users/landing.html')
