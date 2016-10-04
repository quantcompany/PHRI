# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-10-04 16:22
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('data_entry', '0022_auto_20160927_0943'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='key',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
