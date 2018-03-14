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
    #weight in kg
    weight = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    '''
    PCI Risk:
        1 - Long Stented Segment >30mm
        2 - Small Vessel Diameter <=2.5mm
        3 - IN-Stent Restenosis Intervention
        4 - Atherectomy
        5 - Bifurcation PCI
        6 - Left main PCI
        7 - Chronic Total Occlusion PCI
        8 - In the Opinion of the Interventional Cardiologist
        9 - Graft Intervention
    '''
    high_risk_af_1 = models.BooleanField(default=False)
    high_risk_af_2 = models.BooleanField(default=False)
    high_risk_af_3 = models.BooleanField(default=False)
    high_risk_af_4 = models.BooleanField(default=False)
    high_risk_af_5 = models.BooleanField(default=False)
    high_risk_af_6 = models.BooleanField(default=False)
    high_risk_af_7 = models.BooleanField(default=False)
    high_risk_af_8 = models.BooleanField(default=False)
    high_risk_af_9 = models.BooleanField(default=False)

    # Procedure Details
    indication = models.CharField(max_length=15, choices=INDICATION_CHOICES)
    bms_stent = models.BooleanField(default=False)
    des_stent = models.BooleanField(default=False)
    bvs = models.BooleanField(default=False)
    poba = models.BooleanField(default=False)
    deb = models.BooleanField(default=False)
    drug_coated_stent = models.BooleanField(default=False)

    # Atrial Fibrillation
    af_type = models.IntegerField(choices=AF_TYPE_CHOICES, blank=True, null=True)
    prev_anti_coagulation = models.IntegerField(default=0, choices=ANTI_COAGULATION_CHOICES, blank=True, null=True)
    warfarin_intolerance = models.BooleanField(default=False)
    inr_instability = models.BooleanField(default=False)
    doac_allergy_or_intolerance = models.BooleanField(default=False)

    #Medical History
    chf = models.BooleanField(default=False) # CHADS2
    htn = models.IntegerField(default=0, choices=HTN_CHOICES) # CHADS2
    diabetes_mellitus = models.BooleanField(default=False) # CHADS2
    
    tia_stroke_or_sysemb = models.BooleanField(default=False)
    aim = models.BooleanField(default=False)

    vascular_disease = models.IntegerField(default=0, choices=VASCULAR_DISEASE_CHOICES)
    renal_dysfunction = models.BooleanField(default=False)
    liver_dysfunction = models.BooleanField(default=False)
    hx_of_bleeding = models.IntegerField(default=0, choices=BLEEDING_CHOICES)
    alcohol_abuse = models.IntegerField(default=0, choices=ALCOHOL_ABUSE_CHOICES)
    drug_abuse = models.BooleanField(default=False)
    asa_allergy = models.BooleanField(default=False)
    '''
        Creatinine
        A = mg/dL
        B = umol/L
    '''
    creatinine_mgdL = models.FloatField(null=True, blank=True)
    creatinine_umolL = models.FloatField(null=True, blank=True)

    hxoa_anemia = models.BooleanField(default=False)
    hemoglobin_anemia = models.BooleanField(default=False)

    gfr_mLmin = models.FloatField(null=True, blank=True)

    # Recommendation
    mcm_therapy = models.TextField(blank=True)
    # ccs_therapy = models.TextField(blank=True)
    # chosen_therapy = models.CharField(max_length=10, choices=CHOSEN_THERAPY_CHOICES)
    agree_therapy = models.BooleanField(default=True)
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

    @property
    def anemia(self):
        return self.hxoa_anemia or self.hemoglobin_anemia

    def stents_display(self):
        display_lst = list()

        if self.bms_stent:
            display_lst.append('BMS')

        if self.des_stent:
            display_lst.append('DES')
        
        if self.bvs:
            display_lst.append('BVS')

        if self.drug_coated_stent:
            display_lst.append('DRUG COATED STENT')
        
        if self.poba:
            display_lst.append('POBA')

        if self.deb:
            display_lst.append('DEB')

        if len(display_lst) > 0:
            return ", ".join(display_lst)
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
        tia_stroke_or_sysemb_value = 2*(int(self.tia_stroke_or_sysemb))
        return chf_value + htn_value + age_value + diabetes_value + tia_stroke_or_sysemb_value

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
        tia_stroke_or_sysemb_value = 2 * (int(self.tia_stroke_or_sysemb))
        vascular_disease_value = int(self.vascular_disease != 0)
        female_value = int(self.gender == 'F')
        return chf_value + htn_value + age_in_6574_value + age_greater_than_75_value + \
               diabetes_value + tia_stroke_or_sysemb_value + vascular_disease_value + female_value

    def cha2_risk(self):
        return risks.cha2[self.cha2_score()]

    def hasbled_score(self):
        '''
            HASBLED = HTN* (only Yes, uncontrolled on meds SBP>160 mmHg) + Renal Dysfunction + Liver Dysfuntion + Stroke + History of bleeding + Labile INR + Age>=65 + 1*(Alcohol >= 8 drinks/week OR Drugs)
        '''
        # htn is an integer field with 3 possible choices (0, 1 and 2)
        # for hasbled, choice 2 should have a value of 1
        # choices 0 and 1 should have a value of 0
        htn_value = int(bool(self.htn == 2))
        renal_dysfunction_value = int(self.renal_dysfunction)
        liver_dysfunction_value = int(self.liver_dysfunction)
        tia_stroke_or_sysemb_value = int(self.tia_stroke_or_sysemb)
        aim_value = int(self.aim)
        bleeding_value = int(self.hx_of_bleeding != 0)
        inr_value = int(self.inr_instability)
        age_value = int(self.age >= 65)
        drugs_value = int(self.drug_abuse)
        alcohol_abuse_value = int(bool(self.alcohol_abuse == 2))
        return htn_value + renal_dysfunction_value + liver_dysfunction_value + tia_stroke_or_sysemb_value + \
               bleeding_value + inr_value + age_value + (drugs_value or alcohol_abuse_value) + aim_value
               #bleeding_value + inr_value + age_value + drugs_value + alcohol_abuse_value + aim_value

    def hasbled_score_interpretation(self):
        if self.hasbled_score() <= 3:
            return 'LOW'
        else:
            return 'HIGH'

    def hasbled_risk(self):
        return risks.hasbled[self.hasbled_score()]

    def parse_mcm_therapy(self):
        return json.loads(self.mcm_therapy)


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
            self.field_csv(self.weight, float),
            self.field_csv(self.high_risk_af_1, bool),
            self.field_csv(self.high_risk_af_2, bool),
            self.field_csv(self.high_risk_af_3, bool),
            self.field_csv(self.high_risk_af_4, bool),
            self.field_csv(self.high_risk_af_5, bool),
            self.field_csv(self.high_risk_af_6, bool),
            self.field_csv(self.high_risk_af_7, bool),
            self.field_csv(self.high_risk_af_8, bool),
            self.field_csv(self.high_risk_af_9, bool),
            self.field_csv(self.indication, str),
            self.field_csv(self.bms_stent, bool),
            self.field_csv(self.des_stent, bool),
            self.field_csv(self.bvs, bool),
            self.field_csv(self.drug_coated_stent, bool),
            self.field_csv(self.poba, bool),
            self.field_csv(self.deb, bool),
            self.field_csv(self.get_af_type_display(), str),
            self.field_csv(self.get_prev_anti_coagulation_display(), str),
            self.field_csv(self.warfarin_intolerance, bool),
            self.field_csv(self.inr_instability, bool),
            self.field_csv(self.doac_allergy_or_intolerance, bool),
            self.field_csv(self.chf, bool),
            self.field_csv(self.get_htn_display(), str),
            self.field_csv(self.diabetes_mellitus, bool),
            self.field_csv(self.tia_stroke_or_sysemb, bool),
            self.field_csv(self.aim, bool),
            self.field_csv(self.get_vascular_disease_display(), str),
            self.field_csv(self.renal_dysfunction, bool),
            self.field_csv(self.liver_dysfunction, bool),
            self.field_csv(self.get_hx_of_bleeding_display(), str),
            self.field_csv(self.get_alcohol_abuse_display(), str),
            self.field_csv(self.anemia, bool),
            self.field_csv(self.hxoa_anemia, bool),
            self.field_csv(self.hemoglobin_anemia, bool),
            self.field_csv(self.creatinine_mgdL, float),
            self.field_csv(self.creatinine_umolL, float),
            self.field_csv(self.gfr_mLmin, float),
            self.field_csv(self.drug_abuse, bool),
            self.field_csv(self.asa_allergy, bool),
            self.field_csv(self.chads2_score(), int),
            self.field_csv(self.cha2_score(), int),
            self.field_csv(self.hasbled_score(), int),
            self.field_csv(self.agree_therapy, bool),
            self.field_csv(self.reason, str),
            self.field_csv(self.user.user_name, str),
            self.field_csv(self.created, datetime)
        ])
        return buf.getvalue()
