from django.db import models

from base.error import Error
from base.response import Ret


class Course(models.Model):
    L = {
        'subject': 32,
        'code': 32,
        'title': 800,
        'description': 7000,
    }

    subject = models.CharField(
        max_length=L['subject'],
    )
    course_code = models.CharField(
        max_length=L["code"],
    )
    title = models.CharField(
        max_length=L["title"],
    )
    description = models.CharField(
        max_length=L["description"],
    )

    def __str__(self):
        return str(self.id) + ' ' + self.subject + " " + self.course_code

    @staticmethod
    def get_course_by_id(course_id):
        try:
            o_course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Ret(Error.COURSE_NOT_EXIST)
        return Ret(Error.OK, body=o_course)

    @staticmethod
    def get_course_by_subject(subject):
        courses = Course.objects.filter(subject=subject)
        return Ret(Error.OK, body=courses)

    @staticmethod
    def get_course_by_subject_code(subject, course_code):
        try:
            o_course = Course.objects.get(subject=subject, course_code=course_code)
        except:
            return Ret(Error.COURSE_NOT_EXIST)
        return Ret(Error.OK, body=o_course)

    def to_dict(self, term=""):
        ret = Course.get_course_by_id(self.id)
        if ret.error is not Error.OK:
            return Ret(ret.error)
        o_course = ret.body

        from Section.models import Section
        ret = Section.get_sections_by_course(o_course)
        if ret.error is not Error.OK:
            return Ret(ret.error)
        sections = ret.body

        section_list = []
        for section in sections:
            if term == "" or section.term == term:
                section_list.append(section.to_dict())

        return dict(
            id=self.id,
            subject=self.subject,
            course_code=self.course_code,
            title=self.title,
            description=self.description,
            sections=section_list,
        )
