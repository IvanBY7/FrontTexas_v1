# Generated by Django 3.2.6 on 2024-05-15 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0006_alter_sucursal_fk_idregion'),
    ]

    operations = [
        migrations.AddField(
            model_name='region',
            name='Url_img',
            field=models.ImageField(blank=True, null=True, upload_to='regiones/', verbose_name='Imagen'),
        ),
    ]
