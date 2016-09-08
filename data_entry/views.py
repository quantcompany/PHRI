from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from .models import *
from .forms import PatientForm

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
            'HTN_CHOICES': Patient.HTN_CHOICES,
            'ALCOHOL_ABUSE_CHOICES': Patient.ALCOHOL_ABUSE_CHOICES
        },

        'values': {
            'indication': Indication.objects.all(),
            'vessels_pci': VesselsPCI.objects.all(),
            'stent': Stent.objects.all(),
            'type_af': TypeAF.objects.all(),
            'anti_coagulation': AntiCoagulation.objects.all(),
            'vascular_disease': VascularDisease.objects.all(),
            'hx_of_bleeding': HXofBleeding.objects.all(),
            'hx_of_malignancy': HXofMalignancy.objects.all(),
            'asa_allergy': ASAAllergy.objects.all(),
            'upcoming_non_cardiatic_surgery': NonCardiaticSurgery.objects.all(),
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