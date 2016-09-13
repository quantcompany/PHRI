# Some of these choices have underlying INTEGER values
# in the database, and some of them have VARCHARs. The
# decision to use one or the other is based on the following:
# If the choices include a NO or NONE option, then we use integers
# and treat the NO/NONE/NULL choice as zero. Otherwise, we use strings.

HB_UM_CHOICES = (('g/L', 'g/L'), ('g/dL', 'g/dL'))
PLTS_UM_CHOICES = (('10^9xL', '10^9xL'), ('mm3', 'mm3'), ('mL', 'mL'))
INR_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2')) #No units of measurements
CREAT_UM_CHOICES = (('micromol/L', 'micromol/L'), ('mg/dL', 'mg/dL'))
EGFR_UM_CHOICES = (('mL/min/1.73m2', 'mL/min/1.73m2'))
AST_UM_CHOICES = (('U/L', 'U/L'))
ALT_UM_CHOICES = (('U/L', 'U/L'))
GGT_UM_CHOICES = (('U/L', 'U/L'))
ALP_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2')) # MOST BE DELETED
BILIRUBIN_UM_CHOICES = (('micromol/L', 'micromol/L'), ('mg/dL', 'mg/dL'))
TROPONIN_UM_CHOICES = (('ng/mL', 'ng/mL'))

GENDER_CHOICES = (('M', 'Male'), ('F', 'Female'))

HTN_CHOICES = (
    (0, 'No'),
    (1, 'Yes, Controlled HTN on meds'),
    (2, 'Yes, Uncontrolled HTN on meds SBP > 160 mmHg'),
)

STENT_CHOICES = (
    (0, 'No Stent'),
    (1, 'BMS'),
    (2, 'BVS'),
    (3, 'DEB'),
    (4, 'DES'),
)

ALCOHOL_ABUSE_CHOICES = (
    (0, 'No'),
    (1, 'Yes, < 8 drinks a week'),
    (2, 'Yes, >= 8 drinks a week'),
)

VASCULAR_DISEASE_CHOICES = (
    (0, 'No'),
    (1, 'Aortic'),
    (2, 'Coronary'),
    (3, 'Peripheral'),
)

AF_TYPE_CHOICES = (
    (0, 'No Atrial Fibrilation'),
    (1, 'Paroxysmal'),
    (2, 'Persistent'),
    (3, 'Permanent'),
)

INDICATION_CHOICES = (
    ('STEMI', 'STEMI'),
    ('NSTEMI', 'NSTEMI'),
    ('UA', 'UA'),
    ('SCAD', 'SCAD'),
)

ANTI_COAGULATION_CHOICES = (
    (0, 'No'),
    (1, 'Warfarin'),
    (2, 'Ribaroxaban'),
    (3, 'Dabigatran'),
    (4, 'Apixiban'),
)

BLEEDING_CHOICES = (
    (0, 'No'),
    (1, 'GI'),
    (2, 'ICH'),
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