from django.shortcuts import render

from .forms import SurveyForm

from django.views.generic import (
    CreateView,
)

# Create your views here.
class SurveyCreateView(CreateView):
	template_name = 'survey/create.html'
	form_class = SurveyForm