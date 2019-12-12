from django.conf.urls import url

from Event.router import router_event, router_todo, router_event_id, router_event_week

"""/api/events/"""
urlpatterns = [
    url(r'^$', router_event),
    url(r'^(?P<event_id>\d+)$', router_event_id),
    url(r'^todo$', router_todo),
    url(r'^week$', router_event_week)
]