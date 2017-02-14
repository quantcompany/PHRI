import json
import io
import csv
import uuid
from datetime import date, datetime

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

from django_pandas.managers import DataFrameManager

from . import risks
from .choices import *


class Patient(models.Model):
    # random key
    key = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    # Personal Information
    identification = models.CharField(max_length=50)
    first_name = models.CharField(max_length=1, blank=True)
    middle_name = models.CharField(max_length=1, blank=True)
    last_name = models.CharField(max_length=1, blank=True)
    age = models.IntegerField(default=0, validators=[MinValueValidator(18)])
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    # Procedure Details
    indication = models.CharField(max_length=15, choices=INDICATION_CHOICES)
    bms_stent = models.BooleanField(default=False)
    des_stent = models.BooleanField(default=False)

    # Atrial Fibrillation
    af_type = models.IntegerField(choices=AF_TYPE_CHOICES, blank=True, null=True)
    prev_anti_coagulation = models.IntegerField(default=0, choices=ANTI_COAGULATION_CHOICES, blank=True, null=True)
    warfarin_intolerance = models.BooleanField(default=False)
    inr_instability = models.BooleanField(default=False)
    noac_allergy_or_intolerance = models.BooleanField(default=False)

    # Blood Work
    # hb = models.FloatField(null=True, blank=True)
    # hb_um = models.CharField(default='um1', max_length=20, choices=HB_UM_CHOICES)
    # plts = models.FloatField(null=True, blank=True)
    # plts_um = models.CharField(default='um1', max_length=20, choices=PLTS_UM_CHOICES)
    # inr = models.FloatField(null=True, blank=True)
    # creat = models.FloatField(null=True, blank=True)
    # creat_um = models.CharField(default='um1', max_length=20, choices=CREAT_UM_CHOICES)
    # egfr = models.FloatField(null=True, blank=True)
    # egfr_um = models.CharField(default='um1', max_length=20, choices=EGFR_UM_CHOICES)
    # ast = models.FloatField(null=True, blank=True)
    # ast_um = models.CharField(default='um1', max_length=20, choices=AST_UM_CHOICES)
    # alt = models.FloatField(null=True, blank=True)
    # alt_um = models.CharField(default='um1', max_length=20, choices=ALT_UM_CHOICES)
    # ggt = models.FloatField(null=True, blank=True)
    # ggt_um = models.CharField(default='um1', max_length=20, choices=GGT_UM_CHOICES)
    # bilirubin = models.FloatField(null=True, blank=True)
    # bilirubin_um = models.CharField(default='um1', max_length=20, choices=BILIRUBIN_UM_CHOICES)
    # troponin = models.FloatField(null=True, blank=True)
    # troponin_um = models.CharField(default='um1', max_length=20, choices=TROPONIN_UM_CHOICES)

    #Medical History
    chf = models.BooleanField(default=False) # CHADS2
    htn = models.IntegerField(default=0, choices=HTN_CHOICES) # CHADS2
    diabetes_mellitus = models.BooleanField(default=False) # CHADS2
    stroke = models.BooleanField(default=False)
    tia = models.BooleanField(default=False)
    vascular_disease = models.IntegerField(default=0, choices=VASCULAR_DISEASE_CHOICES)
    renal_dysfunction = models.BooleanField(default=False)
    # ckd_on_dialysis = models.BooleanField(default=False)
    # renal_transplant = models.BooleanField(default=False)
    liver_dysfunction = models.BooleanField(default=False)
    hx_of_bleeding = models.IntegerField(default=0, choices=BLEEDING_CHOICES)
    alcohol_abuse = models.IntegerField(default=0, choices=ALCOHOL_ABUSE_CHOICES)
    drug_abuse = models.BooleanField(default=False)
    # chronic_nsaids_rx = models.BooleanField(default=False)
    # excessive_fall_risk = models.BooleanField(default=False)
    # hx_of_malignancy = models.IntegerField(default=0, choices=MALIGNANCY_CHOICES)
    asa_allergy = models.BooleanField(default=False)
    # upcoming_non_cardiatic_surgery = models.IntegerField(default=0, choices=NON_CARDIATIC_SURGERY_CHOICES)

    # Recommendation
    mcm_therapy = models.TextField(blank=True)
    ccs_therapy = models.TextField(blank=True)
    chosen_therapy = models.CharField(max_length=10, choices=CHOSEN_THERAPY_CHOICES)
    reason = models.TextField()
    # Meta Info
    user = models.ForeignKey('users.User', related_name='patients')
    created = models.DateTimeField(auto_now_add=True)

    objects= DataFrameManager()

    class Meta:
        ordering = ('-created',)

    def initials(self):
        parts1 = [self.first_name, self.middle_name, self.last_name]
        parts2 = [p for p in parts1 if len(p.strip()) > 0]
        if len(parts2) > 0:
            return '.'.join(parts2)
        else:
            return 'anonymous'

    def stents_display(self):
        if self.bms_stent and self.des_stent:
            return 'BMS, DES'
        elif self.bms_stent:
            return 'BMS'
        elif self.des_stent:
            return 'DES'
        else:
            return 'None'

    def chads2_score(self):
        # boolean values are converted to ints (1s or 0s)
        chf_value = int(self.chf)
        # htn is an integer field with 3 possible choices (0, 1 and 2)
        # for chads2, 1 or 2 get converted to True, and then to 1
        # 0 gets converted to False, and then to 0
        htn_value = int(bool(self.htn))
        age_value = int(self.age >= 75)
        diabetes_value = int(self.diabetes_mellitus)
        stroke_tia_value = 2*(int(self.stroke) or int(self.tia))
        return chf_value + htn_value + age_value + diabetes_value + stroke_tia_value

    def chads2_score_interpretation(self):
        if self.chads2_score() <= 2:
            return 'LOW'
        else:
            return 'HIGH'

    def chads2_risk(self):
        return risks.chads2[self.chads2_score()]

    def cha2_score(self):
        chf_value = int(self.chf)
        # htn is an integer field with 3 possible choices (0, 1 and 2)
        # 1 or 2 gets converted to 1; 0 gets converted to False, and then to 0
        htn_value = int(bool(self.htn))
        age_in_6574_value = int(self.age >= 65) # Age 65-74, logically: Age>=65
        age_greater_than_75_value = int(self.age >= 75)
        diabetes_value = int(self.diabetes_mellitus)
        stroke_tia_value = 2 * (int(self.stroke) or int(self.tia))
        vascular_disease_value = int(self.vascular_disease != 0)
        female_value = int(self.gender == 'F')
        return chf_value + htn_value + age_in_6574_value + age_greater_than_75_value + \
               diabetes_value + stroke_tia_value + vascular_disease_value + female_value

    def cha2_risk(self):
        return risks.cha2[self.cha2_score()]

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
        age_value = int(self.age >= 65)
        drugs_value = int(self.drug_abuse)
        alcohol_abuse_value = int(bool(self.alcohol_abuse == 2))
        return htn_value + renal_dysfunction_value + liver_dysfunction_value + stroke_value + \
               bleeding_value + inr_value + age_value + drugs_value + alcohol_abuse_value

    def hasbled_score_interpretation(self):
        if self.hasbled_score() <= 3:
            return 'LOW'
        else:
            return 'HIGH'

    def hasbled_risk(self):
        return risks.hasbled[self.hasbled_score()]

    def parse_mcm_therapy(self):
        return json.loads(self.mcm_therapy)

    def parse_ccs_therapy(self):
        return json.loads(self.ccs_therapy)

    def recommended_therapy(self):
        chads2 = self.chads2_score()
        cha2 = self.cha2_score()
        hasbled = self.hasbled_score()

        therapy = []

        if chads2 <= 2:
            therapy.append('Only dual antiplatelet or oral anticoagulation plus one antiplatelet')
        else:
            if hasbled <= 3:
                if self.des_stent:
                    therapy.append('Triple Rx for 6 months, then oral anticoagulation plus one antiplatelet.')
                else:
                    therapy.append('Triple Rx for 1 month, then oral anticoagulation plus one antiplatelet.')
            else:
                if self.des_stent:
                    therapy.append('Triple Rx for 3-6 months, then oral anticoagulation plus one antiplatelet.')
                else:
                    therapy.append('Triple Rx for 1 month, then oral anticoagulation plus one antiplatelet.')

        if not self.warfarin_intolerance:
            therapy.append('Continue Warfarin.')
        else:
            therapy.append('Reduced dose NOAC: dabigatran 110 mg BID, apixaban 2.5 mg BID, rivaroxaban 15 mg qd.')

        return therapy

    def field_csv(self, value, type):
        empty = not bool(value)

        if type is str:
            return value or 'N/A'
        elif type is int:
            return str(value) if not empty else 'N/A'
        elif type is float:
            return '{0:.2f}'.format(value) if not empty else 'N/A'
        elif type is bool:
            return 'Yes' if value else 'No'
        elif type is date:
            return value.strftime('%m/%d/%Y') if not empty else 'N/A'
        elif type is datetime:
            return value.strftime('%m/%d/%Y %H:%M:%S') if not empty else 'N/A'

    def csv(self):
        buf = io.StringIO()
        writer = csv.writer(buf)
        writer.writerow([
            self.field_csv(self.identification, str),
            self.field_csv(self.initials(), str),
            self.field_csv(self.age, int),
            self.field_csv(self.get_gender_display(), str),
            self.field_csv(self.indication, str),
            self.field_csv(self.bms_stent, bool),
            self.field_csv(self.des_stent, bool),
            self.field_csv(self.get_af_type_display(), str),
            self.field_csv(self.get_prev_anti_coagulation_display(), str),
            self.field_csv(self.warfarin_intolerance, bool),
            self.field_csv(self.inr_instability, bool),
            self.field_csv(self.noac_allergy_or_intolerance, bool),
            # blood work fields removed form here
            self.field_csv(self.chf, bool),
            self.field_csv(self.get_htn_display(), str),
            self.field_csv(self.diabetes_mellitus, bool),
            self.field_csv(self.stroke, bool),
            self.field_csv(self.tia, bool),
            self.field_csv(self.get_vascular_disease_display(), str),
            self.field_csv(self.renal_dysfunction, bool),
            self.field_csv(self.liver_dysfunction, bool),
            self.field_csv(self.get_hx_of_bleeding_display(), str),
            self.field_csv(self.get_alcohol_abuse_display(), str),
            self.field_csv(self.drug_abuse, bool),
            self.field_csv(self.asa_allergy, bool),
            self.field_csv(self.get_chosen_therapy_display(), str),
            self.field_csv(self.user.user_name, str),
            self.field_csv(self.created, datetime)
        ])
        return buf.getvalue()
