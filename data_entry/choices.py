# Some of these choices have underlying INTEGER values
# in the database, and some of them have VARCHARs. The
# decision to use one or the other is based on the following:
# If the choices include a NO or NONE option, then we use integers
# and treat the NO/NONE/NULL choice as zero. Otherwise, we use strings.

HB_UM_CHOICES = (
    ('g/L', 'g/L'),
    ('g/dL', 'g/dL'),
)

PLTS_UM_CHOICES = (
    ('10^9xL', '10^9xL'),
    ('mm3', 'mm3'),
    ('mL', 'mL'),
)

CREAT_UM_CHOICES = (
    ('μmol/L', 'μmol/L'),
    ('mg/dL', 'mg/dL'),
)

EGFR_UM_CHOICES = (
    ('mL/min/1.73m2', 'mL/min/1.73m2'),
)

AST_UM_CHOICES = (
    ('U/L', 'U/L'),
)

ALT_UM_CHOICES = (
    ('U/L', 'U/L'),
)

GGT_UM_CHOICES = (
    ('U/L', 'U/L'),
)

BILIRUBIN_UM_CHOICES = (
    ('μmol/L', 'μmol/L'),
    ('mg/dL', 'mg/dL'),
)


TROPONIN_UM_CHOICES = (
    ('ng/mL', 'ng/mL'),
)

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
)

HTN_CHOICES = (
    (0, 'No'),
    (1, 'Yes, Controlled on medicaments'),
    (2, 'Yes, Uncontrolled on medicaments SBP > 160 mmHg'),
)

DIABETES_MELLITUS_CHOICES = (
    (0, 'No'),
    (1, 'Yes'),
)

ALCOHOL_ABUSE_CHOICES = (
    (0, 'No'),
    (1, 'Yes, < 8 drinks a week'),
    (2, 'Yes, >= 8 drinks a week'),
)

VASCULAR_DISEASE_CHOICES = (
    (0, 'No'),
    (1, 'Peripheral vascular disease'),#(1, 'Aortic'),
    (2, 'Myocardial infarction'),#(2, 'Coronary'),
    (3, 'Aortic plaque'),#(3, 'Peripheral'),
)

AF_TYPE_CHOICES = (
    (1, 'Paroxysmal'),
    (2, 'Persistent'),
    (3, 'Permanent'),
)

ELECTIVE_PCI_CHOICES = (
    ('STEMI', 'STEMI'),
    ('NSTEMI', 'NSTEMI'),
    ('UA', 'UA'),
    ('SCAD', 'Stable CAD'),
)

ANTI_COAGULATION_CHOICES = (
    (1, 'Warfarin'),
    (2, 'Rivaroxaban'),
    (3, 'Dabigatran'),
    (4, 'Apixiban'),
)

BLEEDING_CHOICES = (
    (0, 'No'),
    (1, 'Gastrointestinal'),
    (2, 'Intracerebral hemorrhage'),
    (3, 'Hospitalization for bleeding within last year'),
)

MALIGNANCY_CHOICES = (
    (0, 'No'),
    (1, 'Yes, prior'),
    (2, 'Yes, currently under treatment'),
)

NON_CARDIATIC_SURGERY_CHOICES = (
    (0, 'No'),
    (1, 'Yes, < 6 months'),
    (2, 'Yes, >= 6 months'),
)

SMOKING_HISTORY_CHOICES = (
    (0, 'Never smoker'),
    (1, 'Former smoker'),
    (2, 'Current smoker'),
)
