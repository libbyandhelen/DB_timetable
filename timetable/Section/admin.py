from django.contrib import admin

# Register your models here.
from Section.models import Section, UserSection, TimeSlot

admin.site.register(Section)
admin.site.register(UserSection)
admin.site.register(TimeSlot)

