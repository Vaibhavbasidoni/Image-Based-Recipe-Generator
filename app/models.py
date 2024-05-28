from django.db import models
from django.utils import timezone


class Category(models.Model):
    ct_id = models.AutoField(primary_key=True, unique=True)
    ct_category = models.CharField(max_length=100, default="")
    ct_status = models.CharField(max_length=100, default="0")


class Recipe(models.Model):
    rc_id = models.AutoField(primary_key=True, unique=True)
    rc_category = models.CharField(max_length=100, default="")
    rc_recipe = models.CharField(max_length=100, default="")
    rc_steps = models.TextField(default="")
    rc_video = models.TextField(default="")
    rc_status = models.CharField(max_length=100, default="0")


class Hotels(models.Model):
    ht_id = models.AutoField(primary_key=True, unique=True)
    ht_name = models.CharField(max_length=100, default="")
    ht_area = models.CharField(max_length=100, default="")
    ht_city = models.CharField(max_length=100, default="")
    ht_recipe = models.CharField(max_length=100, default="")
    ht_status = models.CharField(max_length=100, default="0")


class AdminMaster(models.Model):
    ad_id = models.AutoField(primary_key=True, unique=True)
    ad_name = models.CharField(max_length=100)
    ad_mobile = models.CharField(max_length=100)
    ad_email = models.CharField(max_length=100)
    ad_password = models.CharField(max_length=100)
    ad_role = models.CharField(max_length=100)
    ad_status = models.CharField(max_length=100, default="0")
    ad_created_by = models.CharField(max_length=100)


class Register(models.Model):
    rg_id = models.AutoField(primary_key=True, unique=True)
    rg_name = models.CharField(max_length=100)
    rg_mobile = models.CharField(max_length=100)
    rg_email = models.CharField(max_length=100)
    rg_city = models.CharField(max_length=100)
    rg_area = models.CharField(max_length=100)
    rg_password = models.CharField(max_length=100)
    rg_status = models.CharField(max_length=100, default="0")
