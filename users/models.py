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
    researcher = models.BooleanField(default=False)

    def get_short_name(self):
        return self.user_name

    def get_full_name(self):
        return self.last_name + ", " + self.first_name

