from django import forms
from django.conf import settings

from .models import Patient


class PatientForm(forms.ModelForm):
    date_of_birth = forms.DateField(input_formats=settings.DATE_INPUT_FORMATS)
    date_of_procedure = forms.DateField(required=False, input_formats=settings.DATE_INPUT_FORMATS)
    class Meta:
        model = Patient
        exclude = ('user',)


class EmailForm(forms.Form):
    address = forms.EmailField()
