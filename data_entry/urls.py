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
   url(r'^test$', views.patient_index_test, name='index_test'),
   url(r'^(?P<patient_id>\d+)/$', views.patient_details, name='details'),
   url(r'^(?P<patient_id>\d+)/printm$', views.print_medical_report, name='print_medical'),
   url(r'^(?P<patient_id>\d+)/printp$', views.print_patient_report, name='print_patient'),
]
# reverse('data_entry:patients:index')
# reverse('data_entry:patients:detail')


urlpatterns = [
    url(r'^form$', views.form, name='form'),
    url(r'^form/test$', views.form_test, name='form_test'),
    url(r'^database$', views.database, name='database'),
    url(r'^guidelines$', views.guidelines, name='guidelines'),
    url(r'^recommendations$', views.recommendations, name='recommendations'),
    url(r'^patients/', include(patients, namespace='patients')),
]
