# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-14 13:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0016_auto_20160913_0814'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='af_type',
            field=models.IntegerField(choices=[(0, 'No Atrial Fibrillation'), (1, 'Paroxysmal'), (2, 'Persistent'), (3, 'Permanent')], default=0),
        ),
        migrations.AlterField(
            model_name='patient',
            name='bilirubin_um',
            field=models.CharField(choices=[('μmol/L', 'μmol/L'), ('mg/dL', 'mg/dL')], default='um1', max_length=20),
        ),
        migrations.AlterField(
            model_name='patient',
            name='creat_um',
            field=models.CharField(choices=[('μmol/L', 'μmol/L'), ('mg/dL', 'mg/dL')], default='um1', max_length=20),
        ),
    ]
