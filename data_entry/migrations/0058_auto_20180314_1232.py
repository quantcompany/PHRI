# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-03-14 12:32
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0057_patient_bvs'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_1',
            new_name='high_risk_af_1',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_2',
            new_name='high_risk_af_2',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_3',
            new_name='high_risk_af_3',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_4',
            new_name='high_risk_af_4',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_5',
            new_name='high_risk_af_5',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_6',
            new_name='high_risk_af_6',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_7',
            new_name='high_risk_af_7',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_8',
            new_name='high_risk_af_8',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='pci_risk_9',
            new_name='high_risk_af_9',
        ),
    ]