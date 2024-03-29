from Course.views import get_course_info
from Section.views import get_sections_by_course, get_sibling_sections, get_section, get_meetings_by_section, get_terms, \
    get_courses_by_term
from base.error import Error
from base.response import error_response


def router_course(request, course_id):
    """
    /api/courses/:course_id
    GET: get_course_info
    """
    if request.method == "GET":
        return get_course_info(request, course_id)
    else:
        return error_response(Error.ERROR_METHOD)


def router_course_id_section(request, course_id):
    """
    /api/courses/:course_id/sections
    GET: get_sections_by_course
    POST: get_sibling_sections
    """
    if request.method == "GET":
        return get_sections_by_course(request, course_id)
    elif request.method == "POST":
        return get_sibling_sections(request, course_id)
    else:
        return error_response(Error.ERROR_METHOD)


def router_course_id_section_id(request, course_id, section_id):
    """
    /api/course/:course_id/sections/section_id
    GET: get_section
    """
    if request.method == 'GET':
        return get_section(request, course_id, section_id)
    else:
        return error_response(Error.ERROR_METHOD)


def router_course_id_section_id_meeting(request, course_id, section_id):
    """
    /api/courses/:course_id/sections/:section_id/meetings
    GET: get_meetings_by_section
    """
    if request.method == "GET":
        return get_meetings_by_section(request, course_id, section_id)
    else:
        return error_response(Error.ERROR_METHOD)


def router_course_term(request):
    """
    /api/courses/terms
    GET: get_terms
    POST: get courses by term
    """
    if request.method == "GET":
        return get_terms(request)
    elif request.method == "POST":
        return get_courses_by_term(request)
    else:
        return error_response(Error.ERROR_METHOD)
