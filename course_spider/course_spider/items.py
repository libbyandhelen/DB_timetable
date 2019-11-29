# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy_djangoitem import DjangoItem

from Course.models import Course

from Section.models import Section, TimeSlot


class CourseItem(DjangoItem):
    django_model = Course


class SectionItem(DjangoItem):
    django_model = Section


class TimeSlotItem(DjangoItem):
    django_model = TimeSlot
