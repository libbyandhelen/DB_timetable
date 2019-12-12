from Event.views import create_event, create_user_todo, get_events_by_user, delete_event, get_event_by_date_range
from base.error import Error
from base.response import error_response


def router_event(request):
    """
    /api/events/
    POST: create an event
    GET: get events by user
    """
    if request.method == "POST":
        return create_event(request)
    elif request.method == "GET":
        return get_events_by_user(request)
    elif request.method == "DELETE":
        return delete_event(request)
    else:
        return error_response(Error.ERROR_METHOD)


def router_todo(request):
    """
    /api/events/todo
    POST: create an UserTodo
    """
    if request.method == "POST":
        return create_user_todo(request)
    else:
        return error_response(Error.ERROR_METHOD)


def router_event_id(request, event_id):
    """
    /api/events/:event_id
    DELETE: delete event by event_id
    """
    if request.method == "DELETE":
        return delete_event(request, event_id)
    else:
        return error_response(Error.ERROR_METHOD)


def router_event_week(request):
    """
    /api/events/week
    POST: get event by range of date
    """
    if request.method == "POST":
        return get_event_by_date_range(request)
    else:
        return error_response(Error.ERROR_METHOD)
