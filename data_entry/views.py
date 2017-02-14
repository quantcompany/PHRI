import json
import math
import itertools

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, Http404
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.views.decorators.csrf import csrf_exempt

import utils
from emails import send_report_email

from .models import *
from .choices import *
from .forms import PatientForm, EmailForm


@login_required
def form(request):
    context = {
        'choices': {
            # bloodwork UM choices removed
            'GENDER_CHOICES': GENDER_CHOICES,
            'HTN_CHOICES': HTN_CHOICES,
            'ALCOHOL_ABUSE_CHOICES': ALCOHOL_ABUSE_CHOICES,
            'VASCULAR_DISEASE_CHOICES': VASCULAR_DISEASE_CHOICES,
            'AF_TYPE_CHOICES': AF_TYPE_CHOICES,
            'INDICATION_CHOICES': INDICATION_CHOICES,
            'ANTI_COAGULATION_CHOICES': ANTI_COAGULATION_CHOICES,
            'BLEEDING_CHOICES': BLEEDING_CHOICES,
        }
    }

    return render(request, 'data_entry/form.html', context)


@login_required
def recommendations(request):
    return render(request, 'data_entry/recommendations.html')


@login_required
def guidelines(request):
    return render(request, 'data_entry/guidelines.html')


@login_required
def patient_index(request):
    if request.method == 'GET':
        if request.is_ajax():
            return JsonResponse({})
        else:
            context = {'patients': Patient.objects.filter(user=request.user).order_by('-created')}
            return render(request, 'data_entry/patients/index.html', context)
    elif request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            new_patient = form.save(commit=False)
            new_patient.user = request.user
            new_patient.save()
            form.save_m2m()
            print('patient saved? yes!')
            print(new_patient)
            return JsonResponse({
                'medical_report_link': '/patients/{0}/reports/medical'.format(new_patient.key),
                'patient_report_link': '/patients/{0}/reports/patient'.format(new_patient.key)
            })
        else:
            return JsonResponse(form.errors, status=400)


@login_required
def patient_details(request, patient_id):
    return JsonResponse({'id': 1, 'name': 'xyz'})



def medical_report(request, patient_key):
    try:
        patient = Patient.objects.get(key=patient_key)
    except:
        raise Http404

    context = {'patient': patient}
    return render(request, 'data_entry/patients/reports/medical.html', context)


def patient_report(request, patient_key):
    try:
        patient = Patient.objects.get(key=patient_key)
    except:
        raise Http404

    chads2_relative = {
        'sad': round(patient.chads2_risk()['percentage']),
        'happy': 100 - round(patient.chads2_risk()['percentage'])
    }
    faces = ('S' * chads2_relative['sad']) + ('H' * chads2_relative['happy'])
    chads2_relative['rows'] = utils.chunks(faces, 10)


    hasbled_relative = {
        'sad': round(patient.hasbled_risk()['percentage']),
        'happy': 100 - round(patient.hasbled_risk()['percentage'])
    }
    faces = ('S' * hasbled_relative['sad']) + ('H' * hasbled_relative['happy'])
    hasbled_relative['rows'] = utils.chunks(faces, 10)
    context = {
        'patient': patient,
        'chads2_relative': chads2_relative,
        'hasbled_relative': hasbled_relative,
    }

    return render(request, 'data_entry/patients/reports/patient.html', context)


@csrf_exempt
def email_medical_report(request, patient_key):
    try:
        patient = Patient.objects.get(key=patient_key)
    except:
        raise Http404

    report_type = 'medical'
    site = get_current_site(request)

    addresses = request.POST.getlist('addresses[]')

    try:
        send_report_email(patient, report_type, addresses, site)
        return JsonResponse({})
    except Exception as ex:
        print('Error sending report:')
        print(ex)
        return JsonResponse({}, status=400)


@csrf_exempt
def email_patient_report(request, patient_key):
    try:
        patient = Patient.objects.get(key=patient_key)
    except:
        raise Http404

    report_type = 'patient'
    site = get_current_site(request)

    addresses = request.POST.getlist('addresses[]')

    try:
        send_report_email(patient, report_type, addresses, site)
        return JsonResponse({})
    except Exception as ex:
        print('Error sending report:')
        print(ex)
        return JsonResponse({}, status=400)


@login_required
def form_test(request):
    context = {
        'choices': {
            # bloodwork um choices removed
            'GENDER_CHOICES': GENDER_CHOICES,
            'HTN_CHOICES': HTN_CHOICES,
            'ALCOHOL_ABUSE_CHOICES': ALCOHOL_ABUSE_CHOICES,
            'VASCULAR_DISEASE_CHOICES': VASCULAR_DISEASE_CHOICES,
            'AF_TYPE_CHOICES': AF_TYPE_CHOICES,
            'INDICATION_CHOICES': INDICATION_CHOICES,
            'ANTI_COAGULATION_CHOICES': ANTI_COAGULATION_CHOICES,
            'BLEEDING_CHOICES': BLEEDING_CHOICES,
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
