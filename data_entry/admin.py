from django.contrib import admin
from .models import *


class PatientAdmin(admin.ModelAdmin):
    readonly_fields = ('chads2_score', 'hasbled_score')
    list_display = (
        'first_name',
        'middle_name',
        'last_name',
        'age',
        'chads2_score',
        'hasbled_score'
        )

admin.site.register(Patient, PatientAdmin)
admin.site.register(VesselsPCI)