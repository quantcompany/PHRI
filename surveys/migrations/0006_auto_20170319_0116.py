# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-03-19 01:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0005_auto_20170319_0114'),
    ]

    operations = [
        migrations.AddField(
            model_name='checkboxchoice',
            name='free_text',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='multiplechoice',
            name='free_text',
            field=models.BooleanField(default=False),
        ),
    ]
