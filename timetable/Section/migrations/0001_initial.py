# Generated by Django 2.1.4 on 2019-11-29 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('User', '0001_initial'),
        ('Course', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_code', models.IntegerField()),
                ('instructor', models.CharField(max_length=100)),
                ('term', models.CharField(max_length=32)),
                ('syllabus_url', models.CharField(max_length=300)),
                ('course_home_url', models.CharField(max_length=300)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Course.Course')),
            ],
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.CharField(max_length=12)),
                ('start', models.CharField(max_length=32)),
                ('end', models.CharField(max_length=32)),
                ('room', models.CharField(max_length=32)),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Section.Section')),
            ],
        ),
        migrations.CreateModel(
            name='UserSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bgcolor', models.CharField(default='', max_length=10, null=True)),
                ('color', models.CharField(default='', max_length=10, null=True)),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Section.Section')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='User.User')),
            ],
        ),
    ]
