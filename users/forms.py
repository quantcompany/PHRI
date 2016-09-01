from django import forms

from custom_user.forms import EmailUserCreationForm


class RegistrationForm(EmailUserCreationForm):
    first_name = forms.CharField(required=False, max_length=40)
    last_name = forms.CharField(required=False, max_length=40)
    institution = forms.CharField(required=False, max_length=100)