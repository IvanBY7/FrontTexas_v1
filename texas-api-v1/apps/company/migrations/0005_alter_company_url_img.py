# Generated by Django 3.2.6 on 2024-05-13 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_alter_rl_user_company_fk_idempresa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='Url_img',
            field=models.ImageField(blank=True, null=True, upload_to='imagenes/', verbose_name='Imagen'),
        ),
    ]
