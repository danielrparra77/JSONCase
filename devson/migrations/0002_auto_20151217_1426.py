# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2015-12-17 19:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devson', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='proyecto',
            old_name='N_NombreProyecto',
            new_name='K_NombreProyecto',
        ),
        migrations.AddField(
            model_name='proyecto',
            name='K_UsuarioCreo',
            field=models.CharField(default='USER', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='proyecto',
            unique_together=set([('K_NombreProyecto', 'K_UsuarioCreo')]),
        ),
    ]
