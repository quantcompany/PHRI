# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-07-04 17:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0044_patient_gfr_mlmin'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='pci_risk_9',
            field=models.BooleanField(default=False),
        ),
    ]