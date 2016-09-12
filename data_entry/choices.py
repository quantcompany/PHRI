# Some of these choices have underlying INTEGER values
# in the database, and some of them have VARCHARs. The
# decision to use one or the other is based on the following:
# If the choices include a NO or NONE option, then we use integers
# and treat the NO/NONE/NULL choice as zero. Otherwise, we use strings.

HB_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
PLTS_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
INR_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
CREAT_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
EGFR_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
AST_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
ALT_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
ALP_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
BILIRUBIN_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))
TROPONIN_UM_CHOICES = (('um1', 'um1'), ('um2', 'um2'))

GENDER_CHOICES = (('M', 'Male'), ('F', 'Female'))

HTN_CHOICES = (
    (0, 'No'),
    (1, 'Yes, Controlled HTN on meds. '),
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
    (1, 'Persistent'),
    (1, 'Permanent'),
)