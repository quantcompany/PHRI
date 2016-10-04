from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse
from django.http import StreamingHttpResponse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied

from data_entry.utils import patients_csv, patients_csv_size_estimate # returns a generator

from data_entry.models import Patient 


@login_required
def index(request):
    context = {'csv_size_estimate': patients_csv_size_estimate()}
    return render(request, 'database/index.html', context)


@login_required
def dump(request):
    # if not request.user.researcher:
    #     raise PermissionDenied
    filename = 'patient_dump_{0}.csv'.format(timezone.now().strftime('%Y%m%d'))
    resp = StreamingHttpResponse(patients_csv(), content_type='text/csv; charset=utf-8')
    resp['Content-Disposition'] = 'attachment; filename="{0}"'.format(filename)
    return resp


@login_required
def filter(request):
    df = Patient.objects.all().to_dataframe()
    ...
    ...
    return HttpResponse(df.to_html())