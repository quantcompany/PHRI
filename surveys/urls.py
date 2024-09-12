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


urlpatterns = [
    url(r'^$', views.display_survey, name='dynamic_survey'),
    url(r'^save/$', views.ajax_save_survey, name='save_survey'),
    url(r'^iapply/$', views.apply_survey, name='iapply'),
    url(r'^extiapply/$', views.apply_external_survey, name='extiapply'),
    url(r'^external_survey/agreed$', views.agreed_external_survey, name='extsurveyagreed'),
]