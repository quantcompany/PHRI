from django.contrib import admin
from .models import *


class PatientAdmin(admin.ModelAdmin):
    fields = (
        'identification',
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'gender',
        'date_of_procedure',
        'indication',
        'vessels_pci',
        'stent',
        'balloons',
        'type_af',
        'prev_anti_coagulation',
        'warfarin_intolerance',
        'inr_instability',
        'noac_allergy_or_intolerance',
        'hb',
        'hb_um',
        'plts',
        'plts_um',
        'inr',
        'inr_um',
        'creat',
        'creat_um',
        'egfr',
        'egfr_um',
        'ast',
        'ast_um',
        'alt',
        'alt_um',
        'alp',
        'alp_um',
        'bilirubin',
        'bilirubin_um',
        'troponin',
        'troponin_um',
        'chf',
        'htn',
        'diabetes_mellitus',
        'stroke',
        'tia',
        'vascular_disease',
        'renal_dysfunction',
        'ckd_on_dialysis',
        'renal_transplant',
        'liver_dysfunction',
        'hx_of_bleeding',
        'alcohol_abuse',
        'drug_abuse',
        'chronic_nsaids_rx',
        'excessive_fall_risk',
        'hx_of_malignancy',
        'asa_allergy',
        'upcoming_non_cardiatic_surgery',
        'followed_recommendation',
        'reason_not_followed',
        'chads2_score',
        'hasbled_score'
    )

    readonly_fields = ('chads2_score', 'hasbled_score')
    list_display = (
        'first_name',
        'middle_name',
        'last_name',
        'age',
        'chads2_score',
        'hasbled_score'
        )
admin.site.register(Patient, PatientAdmin)
admin.site.register(Indication)
admin.site.register(VesselsPCI)
admin.site.register(Stent)
admin.site.register(TypeAF)
admin.site.register(AntiCoagulation)
admin.site.register(VascularDisease)
admin.site.register(HXofBleeding)
admin.site.register(HXofMalignancy)
admin.site.register(ASAAllergy)
admin.site.register(NonCardiaticSurgery)
