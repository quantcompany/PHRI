# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-08-05 04:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0014_question_important_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='important_text',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
