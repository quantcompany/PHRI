from data_entry.models import *


def patients_csv_size_estimate():
    patient_sample = Patient.objects.order_by('?')[:50]
    csv_size = sum([len(p.csv()) for p in patient_sample])
    csv_size_per_patient = csv_size / patient_sample.count()
    csv_headers_size = len(patients_csv_headers())
    return csv_headers_size + (csv_size_per_patient * Patient.objects.all().count())


def patients_csv_headers():
    return '\ufeff' + ', '.join([
        'IDENTIFICATION',
        'INITIALS',
        'AGE',
        'GENDER',
        'INDICATION',
        'BMS STENT',
        'DES STENT',
        'AF TYPE',
        'PREV ANTI COAGULATION',
        'WARFARIN INTOLERANCE',
        'INR INSTABILITY',
        'NOAC ALLERGY OR INTOLERANCE',
        # bloodwork fields removed
        'CHF',
        'HTN',
        'DIABETES MELLITUS',
        'STROKE',
        'TIA',
        'VASCULAR DISEASE',
        'RENAL DYSFUNCTION',
        'LIVER DYSFUNCTION',
        'HX OF BLEEDING',
        'ALCOHOL ABUSE',
        'DRUG ABUSE',
        'ASA ALLERGY',
        'FOLLOWED RECOMMENDATION',
        'USER',
        'CREATED',
    ]) + '\n'


def patients_csv():
    # \ufeff is unicode Byte Order Mark (BOM).
    # put it at the start of the file
    # so that excell will understand the encoding

    # first row, yield the headers
    yield patients_csv_headers()

    # for each patient, yield a row of values
    for patient in Patient.objects.all():
        yield patient.csv()
