from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse
from django.http import StreamingHttpResponse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied

from data_entry.models import *

def patient_generator():
    yield '{0}, {1}, {2}\r\n'.format(
        'Identification',
        'Full Name',
        'Gender'
    )

    for patient in Patient.objects.all():
        yield patient.csv()


@login_required
def index(request):
    patient_sample = Patient.objects.order_by('?')[:50]
    csv_sample = ''.join([p.csv() for p in patient_sample])
    csv_size_per_patient = len(csv_sample) / patient_sample.count()
    csv_size_estimate = Patient.objects.count() * csv_size_per_patient
    context = {'csv_size_estimate': csv_size_estimate}
    return render(request, 'database/index.html', context)


@login_required
def dump(request):
    # if not request.user.researcher:
    #     raise PermissionDenied
    filename = 'patient_dump_{0}.csv'.format(timezone.now().strftime('%Y%m%d'))

    resp = StreamingHttpResponse(patient_generator(), content_type='text/csv')
    resp['Content-Disposition'] = 'attachment; filename="{0}"'.format(filename)
    return resp


# @login_required
# def filter(request):
#     df = pandas.DataFrame()
#     df

    # if not request.user.researcher:
    #     raise PermissionDenied
    # filename = 'patient_dump_{0}.csv'.format(timezone.now().strftime('%Y%m%d'))

    # resp = StreamingHttpResponse(patient_generator(), content_type='text/csv')
    # resp['Content-Disposition'] = 'attachment; filename="{0}"'.format(filename)
    # return resp
