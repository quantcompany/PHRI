# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-12 14:42
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0005_auto_20160909_1052'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='vascular_disease',
        ),
    ]
