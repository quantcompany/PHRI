from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from .models import *
from .choices import *
from .forms import PatientForm

@login_required
def form(request):
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

    return render(request, 'data_entry/form.html', context)


@login_required
def reports(request):
    return render(request, 'reports/reports.html')


@login_required
def patient_index(request):
    if request.method == 'GET':
        if request.is_ajax():
            return JsonResponse({})
        else:
            return render(request, 'data_entry/patients/index.html')
    elif request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            new_patient = form.save(commit=False)
            new_patient.user = request.user
            new_patient.save()
            return JsonResponse({'print_link': '/patients/{0}/print'.format(new_patient.id)})
        else:
            return JsonResponse(form.errors, status=400)


@login_required
def patient_details(request, patient_id):
    return JsonResponse({'id': 1, 'name': 'xyz'})


@login_required
def patient_details_print(request, patient_id):
    patient = get_object_or_404(Patient, id=patient_id)
    context = {'patient': patient}
    return render(request, 'data_entry/patients/print.html', context)


@login_required
def form_test(request):
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

    return render(request, 'data_entry/form_test.html', context)


@login_required
def patient_index_test(request):
    if request.method == 'GET':
        if request.is_ajax():
            return JsonResponse({})
        else:
            return render(request, 'data_entry/patients/index.html')
    elif request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            patient = form.save(commit=False)
            return JsonResponse({
                'chads2': {
                    'score': patient.chads2_score(),
                    'risk': patient.chads2_risk(),
                },

                'cha2': {
                    'score': patient.cha2_score(),
                    'risk': patient.cha2_risk(),
                },

                'hasbled': {
                    'score': patient.hasbled_score(),
                    'risk': patient.hasbled_risk(),
                }
            })
        else:
            return JsonResponse(form.errors, status=400)