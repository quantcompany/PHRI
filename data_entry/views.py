from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from .models import *
from .choices import *
from .forms import PatientForm

@login_required
def dashboard(request):
    context = {
        'choices': {
            'HB_UM_CHOICES': HB_UM_CHOICES, 
            'PLTS_UM_CHOICES': PLTS_UM_CHOICES, 
            'CREAT_UM_CHOICES': CREAT_UM_CHOICES, 
            'EGFR_UM_CHOICES': EGFR_UM_CHOICES, 
            'AST_UM_CHOICES': AST_UM_CHOICES, 
            'ALT_UM_CHOICES': ALT_UM_CHOICES, 
            'GGT_UM_CHOICES': GGT_UM_CHOICES, 
            'BILIRUBIN_UM_CHOICES': BILIRUBIN_UM_CHOICES, 
            'TROPONIN_UM_CHOICES': TROPONIN_UM_CHOICES, 
            'GENDER_CHOICES': GENDER_CHOICES, 
            'HTN_CHOICES': HTN_CHOICES, 
            'STENT_CHOICES': STENT_CHOICES, 
            'ALCOHOL_ABUSE_CHOICES': ALCOHOL_ABUSE_CHOICES, 
            'VASCULAR_DISEASE_CHOICES': VASCULAR_DISEASE_CHOICES, 
            'AF_TYPE_CHOICES': AF_TYPE_CHOICES, 
            'INDICATION_CHOICES': INDICATION_CHOICES, 
            'ANTI_COAGULATION_CHOICES': ANTI_COAGULATION_CHOICES, 
            'BLEEDING_CHOICES': BLEEDING_CHOICES, 
            'MALIGNANCY_CHOICES': MALIGNANCY_CHOICES, 
            'NON_CARDIATIC_SURGERY_CHOICES': NON_CARDIATIC_SURGERY_CHOICES, 
        },

        'values': {
            'vessels_pci': VesselsPCI.objects.all(),
        }
    }

    return render(request, 'data_entry/dashboard.html', context)


@login_required
def reports(request):
    return render(request, 'reports/reports.html')


@login_required
def patients(request):
    if request.method == 'GET':
        return JsonResponse({'patients': [1,2,3]})
    elif request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'saved'})
        else:
            return JsonResponse(form.errors, status=400)


@login_required
def patient_details(request, patient_id):
    return JsonResponse({'id': 1, 'name': 'xyz'})