import io
import csv
from data_entry.models import *
from surveys.models import Survey


def survey_csv(survey_id):
    survey = Survey.objects.get( id = survey_id )

    data = survey.get_report_data()
    header = '\ufeff' + '| '.join(data.get('headers')) + '\n'
    yield header

    buf = io.StringIO()
    writer = csv.writer(buf, delimiter="|")
    for r in data.get('rows'):
        writer.writerow(r)

    yield buf.getvalue()


def patients_csv_size_estimate():
    patient_sample = Patient.objects.order_by('?')[:50]
    csv_size = sum([len(p.csv()) for p in patient_sample])
    if csv_size != 0:
        csv_size_per_patient = csv_size / patient_sample.count()
    else:
        csv_size_per_patient = 0
    csv_headers_size = len(patients_csv_headers())
    return csv_headers_size + (csv_size_per_patient * Patient.objects.all().count())


def patients_csv_headers():
    # \ufeff is unicode Byte Order Mark (BOM).
    # put it at the start of the file
    # so that excell will understand the encoding
    return '\ufeff' + ', '.join([
        'IDENTIFICATION',
        'INITIALS',
        'AGE',
        'GENDER',
        'WEIGHT(kg)',
        # PCI RISKs
        'PCI-LONG STENTED SEGMENT >30MM',
        'PCI-SMALL VESSEL DIAMETER <=2.5MM',
        'PCI-IN-STENT RESTENOSIS INTERVENTION',
        'PCI-ATHERECTOMY',
        'PCI-BIFURCATION PCI',
        'PCI-LEFT MAIN PCI',
        'PCI-CHRONIC TOTAL OCCLUSION PCI',
        'PCI-IN THE OPINION OF THE INTERVENTIONAL CARDIOLOGIST',
        'PCI-GRAFT INTERVENTION',

        'INDICATION',
        'BMS STENT',
        'DES STENT',
        'POBA',
        'DEB',
        'DRUG COATED STENT',
        
        'AF TYPE',
        'PREV ANTI COAGULATION',
        'WARFARIN INTOLERANCE',
        'INR INSTABILITY',
        'DOAC ALLERGY OR INTOLERANCE',
        # bloodwork fields removed
        'CONGESTIVE HEART FAILURE',
        'HYPERTENSION',
        'DIABETES MELLITUS',

        #'STROKE',
        #'TIA',
        'TIA-STROKE-OR-SYSTEMIC EMBOLISM',

        'ANTI-INFLAMMATORY MEDICATIONS',

        'VASCULAR DISEASE',
        'RENAL DYSFUNCTION',
        'LIVER DYSFUNCTION',
        'HISTORY OF BLEEDING',
        'ALCOHOL ABUSE',

        #'HEMOGLOBIN(g/L)',
        #'HEMOGLOBIN(mg/dL)',
        'CREATININE(mg/dL)',
        'CREATININE(umol/L)',
        'GFR(mL/min)',

        'DRUG ABUSE',
        'ASA ALLERGY',
        'CHADS SCORE',
        'CHA2DS2-VASC SCORE',
        'HASBLED SCORE',
        'FOLLOWED RECOMMENDATION',
        'USER',
        'CREATED',
    ]) + '\n'


def patients_csv():
    # first row, yield the headers
    yield patients_csv_headers()

    # for each patient, yield a row of values
    for patient in Patient.objects.all():
        yield patient.csv()
