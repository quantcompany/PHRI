# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-12-05 16:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0029_remove_patient_date_of_procedure'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='af_type',
            field=models.IntegerField(blank=True, choices=[(1, 'Paroxysmal'), (2, 'Persistent'), (3, 'Permanent')], null=True),
        ),
    ]
