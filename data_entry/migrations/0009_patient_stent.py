# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-12 15:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0008_auto_20160912_0945'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='stent',
            field=models.IntegerField(choices=[(0, 'No Stent'), (1, 'BMS'), (2, 'BVS'), (3, 'DEB'), (4, 'DES')], default=0),
        ),
    ]