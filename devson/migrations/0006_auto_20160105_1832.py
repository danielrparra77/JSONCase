# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-01-05 23:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devson', '0005_auto_20160104_2138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estiloobjeto',
            name='V_Valor',
            field=models.CharField(max_length=10),
        ),
    ]
