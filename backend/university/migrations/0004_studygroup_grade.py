# Generated by Django 5.0.1 on 2024-06-18 01:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("university", "0003_alter_student_phone_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="studygroup",
            name="grade",
            field=models.IntegerField(default=1, max_length=2),
            preserve_default=False,
        ),
    ]
