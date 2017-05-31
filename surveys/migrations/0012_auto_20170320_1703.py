# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-03-20 22:03
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0011_auto_20170320_1457'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answerbase',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now, editable=False, verbose_name='Creation Date and Time'),
        ),
        migrations.AlterField(
            model_name='answerbase',
            name='modified',
            field=models.DateTimeField(editable=False, null=True, verbose_name='Modification Date and Time'),
        ),
        migrations.AlterField(
            model_name='answerbase',
            name='order',
            field=models.IntegerField(blank=True, default=0, help_text='Este campo será utilizado para definir el orden del contenido. ', verbose_name='Order'),
        ),
        migrations.AlterField(
            model_name='answerbase',
            name='publish',
            field=models.BooleanField(default=True, help_text='Este campo activará el contenido en la pagina.', verbose_name='Publish'),
        ),
        migrations.AlterField(
            model_name='question',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now, editable=False, verbose_name='Creation Date and Time'),
        ),
        migrations.AlterField(
            model_name='question',
            name='modified',
            field=models.DateTimeField(editable=False, null=True, verbose_name='Modification Date and Time'),
        ),
        migrations.AlterField(
            model_name='question',
            name='order',
            field=models.IntegerField(blank=True, default=0, help_text='Este campo será utilizado para definir el orden del contenido. ', verbose_name='Order'),
        ),
        migrations.AlterField(
            model_name='question',
            name='publish',
            field=models.BooleanField(default=True, help_text='Este campo activará el contenido en la pagina.', verbose_name='Publish'),
        ),
        migrations.AlterField(
            model_name='response',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now, editable=False, verbose_name='Creation Date and Time'),
        ),
        migrations.AlterField(
            model_name='response',
            name='modified',
            field=models.DateTimeField(editable=False, null=True, verbose_name='Modification Date and Time'),
        ),
        migrations.AlterField(
            model_name='response',
            name='order',
            field=models.IntegerField(blank=True, default=0, help_text='Este campo será utilizado para definir el orden del contenido. ', verbose_name='Order'),
        ),
        migrations.AlterField(
            model_name='response',
            name='publish',
            field=models.BooleanField(default=True, help_text='Este campo activará el contenido en la pagina.', verbose_name='Publish'),
        ),
        migrations.AlterField(
            model_name='survey',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now, editable=False, verbose_name='Creation Date and Time'),
        ),
        migrations.AlterField(
            model_name='survey',
            name='modified',
            field=models.DateTimeField(editable=False, null=True, verbose_name='Modification Date and Time'),
        ),
        migrations.AlterField(
            model_name='survey',
            name='order',
            field=models.IntegerField(blank=True, default=0, help_text='Este campo será utilizado para definir el orden del contenido. ', verbose_name='Order'),
        ),
        migrations.AlterField(
            model_name='survey',
            name='publish',
            field=models.BooleanField(default=True, help_text='Este campo activará el contenido en la pagina.', verbose_name='Publish'),
        ),
    ]