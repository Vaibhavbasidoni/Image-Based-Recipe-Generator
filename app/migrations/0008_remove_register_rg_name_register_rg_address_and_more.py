# Generated by Django 4.2.3 on 2023-08-09 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_feedback_delete_addprofessional_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='register',
            name='rg_name',
        ),
        migrations.AddField(
            model_name='register',
            name='rg_address',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='register',
            name='rg_city',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='register',
            name='rg_department',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='register',
            name='rg_fname',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='register',
            name='rg_gender',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='register',
            name='rg_lname',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='register',
            name='rg_reg_no',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='register',
            name='rg_email',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='register',
            name='rg_mobile',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='register',
            name='rg_password',
            field=models.CharField(default='', max_length=100),
        ),
    ]
