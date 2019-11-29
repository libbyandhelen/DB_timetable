from django.contrib import admin

# Register your models here.
from Event.models import Event, UserTodo

admin.site.register(Event)
admin.site.register(UserTodo)
