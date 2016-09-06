from django.contrib import admin
from .models import *

admin.site.register(Patient)
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
