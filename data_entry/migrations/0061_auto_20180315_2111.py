# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-03-15 21:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0060_auto_20180314_1717'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_1',
            new_name='pci_risk_1',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_2',
            new_name='pci_risk_2',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_3',
            new_name='pci_risk_3',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_4',
            new_name='pci_risk_4',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_5',
            new_name='pci_risk_5',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_6',
            new_name='pci_risk_6',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='high_risk_af_7',
            new_name='pci_risk_7',
        ),
    ]
