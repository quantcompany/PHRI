# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-05-31 19:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0039_auto_20170531_0936'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='hemoglobin_mgdL',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
