# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-12-13 19:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0034_auto_20161212_0726'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='followed_recommendation',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='reason_not_followed',
        ),
        migrations.AddField(
            model_name='patient',
            name='chosen_therapy',
            field=models.CharField(choices=[('mcm', 'McMaster'), ('ccs', 'CCS'), ('other', 'Other')], default='other', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='patient',
            name='reason',
            field=models.TextField(default='other'),
            preserve_default=False,
        ),
    ]
