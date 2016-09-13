from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

from .choices import *


class Patient(models.Model):
    # Personal Information
    identification = models.CharField(max_length=50)
    first_name = models.CharField(max_length=40, blank=True)
    middle_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    # Procedure Details
    date_of_procedure = models.DateField()
    indication = models.CharField(max_length=15, choices=INDICATION_CHOICES)
    vessels_pci = models.ManyToManyField('data_entry.VesselsPCI')
    stent = models.IntegerField(default=0, choices=STENT_CHOICES)
    balloons = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])
    # Atrial Fibrillation
    af_type = models.IntegerField(default=0, choices=AF_TYPE_CHOICES)
    prev_anti_coagulation = models.IntegerField(default=0, choices=ANTI_COAGULATION_CHOICES)
    warfarin_intolerance = models.BooleanField(default=False)
    inr_instability = models.BooleanField(default=False)
    noac_allergy_or_intolerance = models.BooleanField(default=False)
    # Blood Work
    hb = models.FloatField(null=True, blank=True)
    hb_um = models.CharField(default='um1', max_length=20, choices=HB_UM_CHOICES)
    plts = models.FloatField(null=True, blank=True)
    plts_um = models.CharField(default='um1', max_length=20, choices=PLTS_UM_CHOICES)
    inr = models.FloatField(null=True, blank=True)
    creat = models.FloatField(null=True, blank=True)
    creat_um = models.CharField(default='um1', max_length=20, choices=CREAT_UM_CHOICES)
    egfr = models.FloatField(null=True, blank=True)
    egfr_um = models.CharField(default='um1', max_length=20, choices=EGFR_UM_CHOICES)
    ast = models.FloatField(null=True, blank=True)
    ast_um = models.CharField(default='um1', max_length=20, choices=AST_UM_CHOICES)
    alt = models.FloatField(null=True, blank=True)
    alt_um = models.CharField(default='um1', max_length=20, choices=ALT_UM_CHOICES)
    ggt = models.FloatField(null=True, blank=True)
    ggt_um = models.CharField(default='um1', max_length=20, choices=GGT_UM_CHOICES)
    bilirubin = models.FloatField(null=True, blank=True)
    bilirubin_um = models.CharField(default='um1', max_length=20, choices=BILIRUBIN_UM_CHOICES)
    troponin = models.FloatField(null=True, blank=True)
    troponin_um = models.CharField(default='um1', max_length=20, choices=TROPONIN_UM_CHOICES)
    #Medical History
    chf = models.BooleanField(default=False) # CHADS2
    htn = models.IntegerField(default=0, choices=HTN_CHOICES) # CHADS2
    diabetes_mellitus = models.BooleanField(default=False) # CHADS2
    stroke = models.BooleanField(default=False)
    tia = models.BooleanField(default=False)
    vascular_disease = models.IntegerField(default=0, choices=VASCULAR_DISEASE_CHOICES)
    renal_dysfunction = models.BooleanField(default=False)
    ckd_on_dialysis = models.BooleanField(default=False)
    renal_transplant = models.BooleanField(default=False)
    liver_dysfunction = models.BooleanField(default=False)
    hx_of_bleeding = models.IntegerField(default=0, choices=BLEEDING_CHOICES)
    alcohol_abuse = models.IntegerField(default=0, choices=ALCOHOL_ABUSE_CHOICES)
    drug_abuse = models.BooleanField(default=False)
    chronic_nsaids_rx = models.BooleanField(default=False)
    excessive_fall_risk = models.BooleanField(default=False)
    hx_of_malignancy = models.IntegerField(default=0, choices=MALIGNANCY_CHOICES)
    asa_allergy = models.BooleanField(default=False)
    upcoming_non_cardiatic_surgery = models.IntegerField(default=0, choices=NON_CARDIATIC_SURGERY_CHOICES)
    # Recommendation
    followed_recommendation = models.BooleanField(default=True)
    reason_not_followed = models.TextField(blank=True)

    def age(self):
        return int((timezone.now().date() - self.date_of_birth).days / 365.0)

    def chads2_score(self):
        # boolean values are converted to ints (1s or 0s)
        chf_value = int(self.chf)
        # htn is an integer field with 3 possible choices (0, 1 and 2)
        # for chads2, 1 or 2 get converted to True, and then to 1
        # 0 gets converted to False, and then to 0
        htn_value = int(bool(self.htn)) 
        age_value = int(self.age() > 75)
        diabetes_value = int(self.diabetes_mellitus)
        stroke_tia_value = 2*(int(self.stroke) or int(self.tia))
        return chf_value + htn_value + age_value + diabetes_value + stroke_tia_value

    def cha2ds2_vas_score(self):
        chf_value = int(self.chf)
        # htn is an integer field with 3 possible choices (0, 1 and 2)
        # 1 or 2 gets converted to 1; 0 gets converted to False, and then to 0
        htn_value = int(bool(self.htn))
        age_in_6574_value = int(self.age() >= 65) # Age 65-74, logically: Age>=65
        age_greater_than_75_value = int(self.age() >= 75)
        diabetes_value = int(self.diabetes_mellitus)
        stroke_tia_value = 2 * (int(self.stroke) or int(self.tia))
        vascular_disease_value = int(self.vascular_disease != 0)
        female_value = int(self.gender == 'F')
        return chf_value + htn_value + age_in_6574_value + age_greater_than_75_value + \
               diabetes_value + stroke_tia_value + vascular_disease_value + female_value

    def hasbled_score(self):
        # htn is an integer field with 3 possible choices (0, 1 and 2)
        # for hasbled, choice 2 should have a value of 1
        # choices 0 and 1 should have a value of 0
        htn_value = int(bool(self.htn == 2))
        renal_dysfunction_value = int(self.renal_dysfunction)
        liver_dysfunction_value = int(self.liver_dysfunction)
        stroke_value = int(self.stroke)
        bleeding_value = int(self.hx_of_bleeding != 0)
        inr_value = int(self.inr_instability)
        age_value = int(self.age() >= 65)
        drugs_value = int(self.drug_abuse)
        alcohol_abuse_value = int(bool(self.alcohol_abuse == 2))
        return htn_value + renal_dysfunction_value + liver_dysfunction_value + stroke_value + \
               bleeding_value + inr_value + age_value + drugs_value + alcohol_abuse_value


class VesselsPCI(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value