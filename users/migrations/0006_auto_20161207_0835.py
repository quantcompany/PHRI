# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-12-07 14:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_user_specialty'),
    ]

    operations = [
        migrations.CreateModel(
            name='PracticeType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='practice_type',
        ),
        migrations.AddField(
            model_name='user',
            name='specialty',
            field=models.IntegerField(blank=True, choices=[(0, 'Cardiology'), (1, 'General Physician'), (2, 'Hematology'), (3, 'Internal Medicine'), (4, 'Neurology'), (5, 'Nurse Practitioner'), (6, 'Pharmacist')], null=True),
        ),
    ]
