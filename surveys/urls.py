from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^create/$', views.SurveyCreateView.as_view(), name='survey_create'),
]