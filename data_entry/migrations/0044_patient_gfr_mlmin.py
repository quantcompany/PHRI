# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-02 01:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0043_patient_hemoglobin_gl'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='gfr_mLmin',
            field=models.FloatField(blank=True, null=True),
        ),
    ]