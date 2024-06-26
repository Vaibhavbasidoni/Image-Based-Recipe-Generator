# Generated by Django 4.2.3 on 2024-03-29 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_alter_adminmaster_ad_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Register',
            fields=[
                ('rg_id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('rg_name', models.CharField(max_length=100)),
                ('rg_mobile', models.CharField(max_length=100)),
                ('rg_email', models.CharField(max_length=100)),
                ('rg_city', models.CharField(max_length=100)),
                ('rg_area', models.CharField(max_length=100)),
                ('rg_password', models.CharField(max_length=100)),
                ('rg_status', models.CharField(default='0', max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='recipe',
            name='rc_steps',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='rc_video',
            field=models.TextField(default=''),
        ),
    ]
