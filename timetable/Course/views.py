from Course.models import Course
from base.decorator import require_get, require_login
from base.error import Error
from base.response import error_response, response


@require_get
@require_login
def get_course_info(request, course_id):
    """GET /api/courses/:course_id"""
    ret = Course.get_course_by_id(course_id)
    if ret.error is not Error.OK:
        return error_response(ret.error)
    o_course = ret.body
    return response(body=o_course.to_dict())
