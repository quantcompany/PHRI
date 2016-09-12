# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-12 16:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0010_auto_20160912_1025'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='af_type',
            field=models.IntegerField(choices=[(0, 'No Atrial Fibrilation'), (1, 'Paroxysmal'), (1, 'Persistent'), (1, 'Permanent')], default=0),
        ),
    ]
