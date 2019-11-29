from Section.views import get_selected_sections_by_user, create_select_section, delete_select_section, \
    create_select_section_by_section_id
from base.error import Error
from base.response import error_response


def router_selectsection(request):
    """
    /api/usersections
    GET: get_selected_sections_by_user
    POST: create_select_section
    """

    if request.method == "GET":
        return get_selected_sections_by_user(request)
    elif request.method == "POST":
        return create_select_section(request)
    # elif request.method == "DELETE":
    #     return delete_section_by_category(request)
    else:
        return error_response(Error.ERROR_METHOD)


def router_selectsection_id(request, section_id):
    """
    /api/usersections/:section_id
    DELETE: delete_select_section
    POST: create_select_section_by_section_id
    """

    if request.method == "DELETE":
        return delete_select_section(request, section_id)
    elif request.method == "POST":
        return create_select_section_by_section_id(request, section_id)
    else:
        return error_response(Error.ERROR_METHOD)