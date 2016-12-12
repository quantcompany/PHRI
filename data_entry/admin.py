from django.contrib import admin
from .models import *


class PatientAdmin(admin.ModelAdmin):
    readonly_fields = ('chads2_score', 'hasbled_score', 'key')
    list_display = (
        'initials',
        'age',
        'chads2_score',
        'hasbled_score'
        )

admin.site.register(Patient, PatientAdmin)
