"""PHRI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include

from . import views


patients = [
   url(r'^$', views.patient_index, name='index'),
   url(r'^(?P<patient_id>\d+)/$', views.patient_details, name='details'),
]
# reverse('data_entry:patients:index')
# reverse('data_entry:patients:detail')


urlpatterns = [
    url(r'^form$', views.form, name='form'),
    url(r'^reports$', views.reports, name='reports'),
    url(r'^patients/', include(patients, namespace='patients'))
]
