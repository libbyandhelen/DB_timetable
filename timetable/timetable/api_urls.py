from django.conf.urls import url, include

urlpatterns = [
    url(r'^courses/', include('Course.urls')),
    url(r'^user/', include('User.urls')),
    # url(r'^events/', include('Event.urls')),
    url(r'^usersections/', include('Section.urls')),
    # url(r'^selectsections/', include('Section.urls')),
]