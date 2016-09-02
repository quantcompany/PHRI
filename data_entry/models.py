from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator


class Patient(models.Model):
    GENDER_CHOICES = (('M', 'Male'), ('F', 'Female'))
    # Personal Information
    identification = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=40, blank=True)
    middle_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    # Procedure Details
    date_of_procedure = models.DateField()
    indication = models.ForeignKey('data_entry.Indication')
    vessels_pci = models.ManyToManyField('data_entry.VesselsPCI')
    stent = models.ForeignKey('data_entry.Stent')
    ballons = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(9)])
    # Atrial Fibrillation
    type_af = models.ForeignKey('data_entry.TypeAF')
    prev_anti_coagulation = models.ForeignKey('data_entry.AntiCoagulation', null=True, blank=True)
    warfarin_intolerance = models.BooleanField(default=False)
    inr_inestability = models.BooleanField(default=False)
    noac_allergy_or_intolerance = models.BooleanField(default=False)
    # Blood Work
    hb = models.FloatField(null=True, blank=True)
    plts = models.FloatField(null=True, blank=True)
    inr = models.FloatField(null=True, blank=True)
    creat = models.FloatField(null=True, blank=True)
    egfr = models.FloatField(null=True, blank=True)
    ast = models.FloatField(null=True, blank=True)
    alt = models.FloatField(null=True, blank=True)
    alp = models.FloatField(null=True, blank=True)
    bilirubin = models.FloatField(null=True, blank=True)
    troponin = models.FloatField(null=True, blank=True)
    #Medical History
    chf = models.BooleanField(default=False)
    htn = models.ForeignKey('data_entry.HTN', null=True, blank=True)
    diabetes_mellitus = models.BooleanField(default=False)
    stroke = models.BooleanField(default=False)
    tia = models.BooleanField(default=False)
    vascular_disease = models.ForeignKey('data_entry.VascularDisease', null=True, blank=True)
    renal_dysfunction = models.BooleanField(default=False)
    ckd_on_dialysis = models.BooleanField(default=False)
    renal_transplant = models.BooleanField(default=False)
    liver_dysfunction = models.BooleanField(default=False)
    hx_of_bleeding = models.ForeignKey('data_entry.HXofBleeding', null=True, blank=True)
    alcohol_abuse = models.ForeignKey('data_entry.AlcoholAbuse', null=True, blank=True)
    drugs_abuse = models.BooleanField(default=False)
    chronic_nsaids_rx = models.BooleanField(default=False)
    excesive_fall_risk = models.BooleanField(default=False)
    hx_of_malignancy = models.ForeignKey('data_entry.HXofMalignancy', null=True, blank=True)
    asa_allergy = models.ForeignKey('data_entry.ASAAllergy', null=True, blank=True)
    upcoming_non_cardiatic_surgery = models.ForeignKey('data_entry.NonCardiaticSurgery', null=True, blank=True)

    def get_age(self):
        return int((timezone.now().date() - self.date_of_birth).days / 365.0)


class Indication(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class VesselsPCI(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class Stent(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class TypeAF(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class AntiCoagulation(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class HTN(models.Model):
    value = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.value


class VascularDisease(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class HXofBleeding(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class AlcoholAbuse(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class HXofMalignancy(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class ASAAllergy(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value


class NonCardiaticSurgery(models.Model):
    value = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.value
