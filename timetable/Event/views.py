from Event.models import Event, UserTodo
from base.common import get_user_from_session
from base.decorator import require_post, require_login, require_json, require_params, require_get, require_delete
from base.error import Error
from base.response import error_response, response


@require_login
@require_post
@require_json
@require_params(['name', 'end_date', 'end_time', 'memo', 'status'])
def create_event(request):
    name = request.POST['name']
    end_date = request.POST["end_date"]
    end_time = request.POST['end_time']
    status = request.POST['status']
    memo = request.POST['memo']

    ret = Event.create_event(
        name=name,
        end_date=end_date,
        end_time=end_time,
        memo=memo,
        status=status,
    )
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_event = ret.body
    return response(body=o_event.to_dict())


@require_login
@require_post
@require_json
@require_params(['event_id'])
def create_user_todo(request):
    event_id = request.POST['event_id']
    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = Event.get_event_by_id(event_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_event = ret.body

    ret = UserTodo.create_user_todo(
        o_user=o_user,
        o_event=o_event,
    )
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user_todo = ret.body
    return response(body=o_user_todo.to_dict())


@require_login
@require_get
def get_events_by_user(request):
    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = UserTodo.get_user_todo_by_user(o_user)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    user_todos = ret.body

    event_list = []
    for user_todo in user_todos:
        event_list.append(user_todo.event.to_dict())
    return response(body=event_list)


@require_login
@require_delete
@require_json
@require_params(['event_id'])
def delete_event(request):
    event_id = request.POST['event_id']

    ret = Event.delete_event_by_id(event_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    return response()


@require_login
@require_json
@require_post
@require_params(['start_date', 'end_date'])
def get_event_by_date_range(request):
    start_date = request.POST['start_date']
    end_date = request.POST['end_date']

    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = UserTodo.get_user_event_by_date_range(
        start_date=start_date,
        end_date=end_date,
        o_user=o_user,
    )
    if ret.error is not Error.OK:
        return error_response(ret.error)
    event_list = ret.body
    return response(body=event_list)
