"""timetable URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include

from timetable import front_views, search_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'api/', include('timetable.api_urls')),
    url(r'search/', search_views.auto_search),

    url(r'signup', front_views.signup_page),
    url(r'timetable', front_views.timetable_page),
]
