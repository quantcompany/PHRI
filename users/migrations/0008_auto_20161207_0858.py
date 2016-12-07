# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-12-07 14:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_user_practice_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='practice_type',
        ),
        migrations.AddField(
            model_name='user',
            name='practice_type',
            field=models.ManyToManyField(blank=True, null=True, to='users.PracticeType'),
        ),
    ]
