from django import forms
from django.contrib.auth import authenticate

from custom_user.forms import EmailUserCreationForm

from .models import User


class RegistrationForm(EmailUserCreationForm):
    first_name = forms.CharField(required=False, max_length=40)
    last_name = forms.CharField(required=False, max_length=40)
    institution = forms.CharField(required=False, max_length=100)


class ProfileForm(forms.ModelForm):
    old_password = forms.CharField(required=False, strip=False)
    new_password1 = forms.CharField(required=False, strip=False)
    new_password2 = forms.CharField(required=False, strip=False)
    change_password = forms.BooleanField(required=False)

    error_messages = {
        'authentication_failed': 'Wrong passowrd',
        'password_mismatch': 'Passwords do not match'
    }

    class Meta:
        model = User
        fields = [
            'user_name',
            'first_name',
            'last_name',
            'institution',
            'specialty',
            'practice_type',
            'education_level',
            'country',
            'researcher'
        ]

    def clean(self):
        if self.cleaned_data.get('change_password'):
            assert hasattr(self, 'instance') and self.instance is not None
            user = self.instance
            pwd = self.cleaned_data.get('old_password')

            if not authenticate(username=user.email, password=pwd):
                raise forms.ValidationError(
                    self.error_messages['authentication_failed'],
                    code='authentication_failed',
                )


    def clean_new_password2(self):
        p1 = self.cleaned_data.get('new_password1')
        p2 = self.cleaned_data.get('new_password2')
        if p1 and p2 and p1 != p2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return p2
