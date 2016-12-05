from django import forms
from django.conf import settings

from .models import Patient


class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        exclude = ('user',)


class EmailForm(forms.Form):
    address = forms.EmailField()
