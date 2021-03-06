# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-06 14:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0003_auto_20160905_1115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='alcohol_abuse',
            field=models.IntegerField(choices=[(0, 'No'), (1, 'Yes, < 8 drinks a week'), (2, 'Yes, >= 8 drinks a week')], default=0),
        ),
        migrations.AlterField(
            model_name='patient',
            name='htn',
            field=models.IntegerField(choices=[(0, 'No'), (1, 'Yes, Controlled HTN on meds. '), (2, 'Yes, Uncontrolled HTN on meds SBP > 160 mmHg')], default=0),
        ),
        migrations.DeleteModel(
            name='AlcoholAbuse',
        ),
        migrations.DeleteModel(
            name='HTN',
        ),
    ]
