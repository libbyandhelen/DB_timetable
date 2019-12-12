import random

from Course.models import Course
from Section.models import Section, TimeSlot, UserSection
from base.common import get_user_from_session
from base.decorator import require_login, require_get, require_post, require_json, require_params, require_delete
from base.error import Error
from base.response import error_response, response


@require_login
@require_get
def get_sections_by_course(request, course_id):
    """GET /api/courses/:course_id/sections"""
    ret = Course.get_course_by_id(course_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_course = ret.body

    ret = Section.get_sections_by_course(o_course)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    sections = ret.body

    section_list = []
    for section in sections:
        section_list.append(section.to_dict())
    return response(body=section_list)


@require_login
@require_post
@require_json
@require_params(['term', 'section_id'])
def get_sibling_sections(request, course_id):
    """POST /api/courses/:course:id/sections"""
    term = request.POST['term']
    section_id = request.POST['section_id']

    ret = Course.get_course_by_id(course_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_course = ret.body

    ret = Section.get_sections_by_course(o_course)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    sections = ret.body

    section_list = []
    for section in sections:
        if section.term == term and section.id != section_id:
            section_list.append(dict(
                sibling=section.to_dict(),
                self_id=section_id,
            ))
    return response(body=section_list)


@require_login
@require_get
def get_section(request, course_id, section_id):
    """GET /api/courses/:course_id/sections/:section_id"""
    ret = Course.get_course_by_id(course_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_course = ret.body

    ret = Section.get_section_by_id(section_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_section = ret.body

    ret = o_section.belong_to(o_course)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    return response(body=o_section)


@require_login
@require_get
def get_meetings_by_section(request, course_id, section_id):
    """GET /api/courses/:course_id/sections/:section_id/meetings"""
    ret = Course.get_course_by_id(course_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_course = ret.body

    ret = Section.get_section_by_id(section_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_section = ret.body

    ret = o_section.belong_to(o_course)
    if ret.error is not Error.OK:
        return error_response(ret.error)

    ret = TimeSlot.get_meetings_by_section(o_section)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    meetings = ret.body

    meeting_list = []
    for meeting in meetings:
        meeting_list.append(meeting.to_dict())
    return response(body=meeting_list)


@require_get
@require_login
def get_terms(request):
    """GET /api/courses/terms"""
    ret = Section.get_terms()
    if ret.error is not Error.OK:
        return error_response(ret.error)
    terms = ret.body
    return response(body=terms)


@require_login
@require_get
def get_selected_sections_by_user(request):
    """GET /api/usersections"""
    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = UserSection.get_selected_section_by_user(o_user)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    select_sections = ret.body

    section_list = []
    for select_section in select_sections:
        section_list.append(select_section.to_dict())
    return response(body=section_list)


@require_login
@require_post
@require_json
@require_params(['course_id', 'term'])
def create_select_section(request):
    """POST /api/usersections"""
    color_scheme = [
        {
            'bgcolor': "#A3E7FC",
            'color': 'black'
        },
        {
            'bgcolor': "#3F7CAC",
            'color': 'white'
        },
        {
            'bgcolor': "#439A86",
            'color': 'white'
        },
        {
            'bgcolor': "#E25186",
            'color': 'white'
        },
        {
            'bgcolor': "#F9DC5C",
            'color': 'black'
        },
        {
            'bgcolor': "#ECCBD9",
            'color': 'black'
        },
        {
            'bgcolor': "#392B58",
            'color': 'white'
        },
        {
            'bgcolor': "#FAC9B8",
            'color': 'black'
        },
        {
            'bgcolor': "#D3F8E2",
            'color': 'balck'
        },
        {
            'bgcolor': "#004E64",
            'color': 'white'
        },
        {
            'bgcolor': "#8CB369",
            'color': 'black'
        }
    ]
    course_id = request.POST['course_id']
    term = request.POST['term']

    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = Course.get_course_by_id(course_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_course = ret.body

    ret = Section.get_sections_by_course(o_course)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    sections = ret.body

    select_section_list = []
    for o_section in sections:
        if o_section.term == term:
            # type_list.append(o_section.type)

            ret = UserSection.get_selected_section_by_details(
                o_user,
                o_course,
                term,
            )
            if ret.error is not Error.OK:
                return error_response(ret.error)
            same_color = ret.body
            if same_color:
                bgcolor = same_color[0].bgcolor
                color = same_color[0].color
            else:
                rand = random.randint(0, len(color_scheme) - 1)
                bgcolor = color_scheme[rand]['bgcolor']
                color = color_scheme[rand]['color']

            ret = UserSection.select_section(
                o_user=o_user,
                o_section=o_section,
                bgcolor=bgcolor,
                color=color,
            )
            if ret.error is not Error.OK:
                return error_response(ret.error)
            select_section_list.append(ret.body.to_dict())

    return response(body=select_section_list)


@require_login
@require_delete
@require_json
@require_params(['section_id'])
def delete_select_section(request):
    """DELETE /api/usersections/:section_id"""
    section_id = request.POST['section_id']
    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = Section.get_section_by_id(section_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_section = ret.body

    ret = UserSection.get_select_section(o_user, o_section)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_select_section = ret.body
    o_select_section.delete()
    return response()


@require_login
@require_post
@require_json
@require_params(['bg_color', 'color', 'section_id'])
def create_select_section_by_section_id(request):
    """POST /api/usersections/:section_id"""
    bg_color = request.POST['bg_color']
    color = request.POST['color']
    section_id = request.POST['section_id']

    ret = get_user_from_session(request)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_user = ret.body

    ret = Section.get_section_by_id(section_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_section = ret.body

    ret = UserSection.select_section(o_user, o_section, bg_color, color)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_select_section = ret.body
    return response(body=o_select_section.to_dict())


@require_login
@require_post
@require_json
@require_params(['term'])
def get_courses_by_term(request):
    term = request.POST['term']
    ret = Section.get_course_by_term(term)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    courses = ret.body
    course_list = []
    for course in courses:
        course_list.append(course.to_dict())
    return response(body=course_list)
