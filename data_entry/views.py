from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .models import *


@login_required
def dashboard(request):
    context = {
        'choices': {
            'GENDER_CHOICES': Patient.GENDER_CHOICES,
            'HB_UM_CHOICES': Patient.HB_UM_CHOICES,
            'PLTS_UM_CHOICES': Patient.PLTS_UM_CHOICES,
            'INR_UM_CHOICES': Patient.INR_UM_CHOICES,
            'CREAT_UM_CHOICES': Patient.CREAT_UM_CHOICES,
            'EGFR_UM_CHOICES': Patient.EGFR_UM_CHOICES,
            'AST_UM_CHOICES': Patient.AST_UM_CHOICES,
            'ALT_UM_CHOICES': Patient.ALT_UM_CHOICES,
            'ALP_UM_CHOICES': Patient.ALP_UM_CHOICES,
            'BILIRUBIN_UM_CHOICES': Patient.BILIRUBIN_UM_CHOICES,
            'TROPONIN_UM_CHOICES': Patient.TROPONIN_UM_CHOICES,
        },

        'indications': Indication.objects.all(),
        'vessels_pci': VesselsPCI.objects.all(),
        'stents': Stent.objects.all(),
        'types_af': TypeAF.objects.all(),
        'anti_coagulations': AntiCoagulation.objects.all()
    }

    return render(request, 'data_entry/dashboard.html', context)