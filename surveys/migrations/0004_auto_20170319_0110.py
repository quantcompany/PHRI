# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-03-19 01:10
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('surveys', '0003_remove_answerbase_response'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answerbase',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='answerbase',
            name='modified_by',
        ),
        migrations.RemoveField(
            model_name='answerbase',
            name='question',
        ),
        migrations.RemoveField(
            model_name='answerinteger',
            name='answerbase_ptr',
        ),
        migrations.RemoveField(
            model_name='answerradio',
            name='answerbase_ptr',
        ),
        migrations.RemoveField(
            model_name='answerselect',
            name='answerbase_ptr',
        ),
        migrations.RemoveField(
            model_name='answerselectmultiple',
            name='answerbase_ptr',
        ),
        migrations.RemoveField(
            model_name='answertext',
            name='answerbase_ptr',
        ),
        migrations.RemoveField(
            model_name='response',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='response',
            name='modified_by',
        ),
        migrations.RemoveField(
            model_name='response',
            name='survey',
        ),
        migrations.DeleteModel(
            name='AnswerBase',
        ),
        migrations.DeleteModel(
            name='AnswerInteger',
        ),
        migrations.DeleteModel(
            name='AnswerRadio',
        ),
        migrations.DeleteModel(
            name='AnswerSelect',
        ),
        migrations.DeleteModel(
            name='AnswerSelectMultiple',
        ),
        migrations.DeleteModel(
            name='AnswerText',
        ),
        migrations.DeleteModel(
            name='Response',
        ),
    ]
