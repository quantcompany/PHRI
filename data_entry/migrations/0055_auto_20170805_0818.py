# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-08-05 08:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0054_auto_20170805_0802'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='hemoglobin_anemia',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='patient',
            name='hxoa_anemia',
            field=models.BooleanField(default=False),
        ),
    ]
