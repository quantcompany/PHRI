import json

from django.db import models

from custom_user.models import AbstractEmailUser


class User(AbstractEmailUser):
    """
    User for the application
    """
    user_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    institution = models.CharField(max_length=100, blank=True)
    specialty = models.CharField(max_length=100, blank=True)
    practice_type = models.CharField(max_length=100, blank=True)
    education_level = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True) # Add country list
    researcher = models.BooleanField(default=False)

    def guess_user_name(self):
        if not self.user_name:
            if self.first_name or self.last_name:
                self.user_name = '{0} {0}'.format(self.first_name, self.last_name).strip()
            else:
                self.user_name = self.email.split('@')[0]

        return self.user_name

    def get_short_name(self):
        return self.user_name

    def get_full_name(self):
        return self.last_name + ", " + self.first_name

    def as_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'user_name': self.user_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'institution': self.institution,
            'researcher': self.researcher,
            'specialty': self.specialty,
            'practice_type': self.practice_type,
            'education_level': self.education_level,
            'country': self.country
        }
