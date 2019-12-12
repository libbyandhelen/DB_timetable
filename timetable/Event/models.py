from datetime import datetime

from django.db import models

from User.models import User
from base.error import Error
from base.response import Ret


class Event(models.Model):
    L = {
        'name': 100,
        'end_date': 32,
        'end_time': 32,
        'memo': 300,
    }
    name = models.CharField(
        max_length=L["name"],
    )
    end_date = models.CharField(
        max_length=L["end_date"],
    )
    end_time = models.CharField(
        max_length=L["end_time"],
    )
    memo = models.CharField(
        max_length=L["memo"],
    )
    status = models.BooleanField(
        default=False,
    )

    def __str__(self):
        return str(self.id) + "  " + str(self.name)

    @classmethod
    def create(cls, name, end_date, end_time, memo, status):
        try:
            o_event = cls(
                name=name,
                end_date=end_date,
                end_time=end_time,
                memo=memo,
                status=status,
            )
            o_event.save()
        except:
            return Ret(Error.ERROR_CREATE_EVENT)
        return Ret(Error.OK, o_event)

    @staticmethod
    def get_event_by_id(event_id):
        try:
            o_event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Ret(Error.EVENT_NOT_EXIST)
        return Ret(Error.OK, body=o_event)

    @staticmethod
    def create_event(name, end_date, end_time, memo, status):
        ret = Event.create(name, end_date, end_time, memo, status)
        if ret.error is not Error.OK:
            return Ret(ret.error)
        return Ret(Error.OK, ret.body)

    @staticmethod
    def delete_event_by_id(event_id):
        ret = Event.get_event_by_id(event_id)
        if ret.error is not Error.OK:
            return Ret(ret.error)
        o_event = ret.body
        o_event.delete()
        return Ret(Error.OK)

    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            end_date=self.end_date,
            end_time=self.end_time,
            memo=self.memo,
            status=self.status,
        )


class UserTodo(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return str(self.id) + "  " + str(self.user.username)+" - "+str(self.event.name)

    @classmethod
    def create(cls, o_user, o_event):
        try:
            o_user_todo = cls(
                user=o_user,
                event=o_event,
            )
            o_user_todo.save()
        except:
            return Ret(Error.ERROR_CREATE_SELECTSECTION)
        return Ret(Error.OK, o_user_todo)

    @staticmethod
    def get_user_todo_by_id(user_todo_id):
        try:
            o_user_todo = UserTodo.objects.get(id=user_todo_id)
        except UserTodo.DoesNotExist:
            return Ret(Error.USER_TODO_NOT_EXIST)
        return Ret(Error.OK, body=o_user_todo)

    @staticmethod
    def get_user_todo_by_user(o_user):
        user_todos = UserTodo.objects.filter(user=o_user)
        return Ret(Error.OK, user_todos)

    @staticmethod
    def create_user_todo(o_user, o_event):
        ret = UserTodo.create(o_user, o_event)
        if ret.error is not Error.OK:
            return Ret(ret.error)
        return Ret(Error.OK, ret.body)

    @staticmethod
    def get_user_event_by_date_range(start_date, end_date, o_user):
        start = datetime.strptime(start_date, "%m/%d/%Y")
        end = datetime.strptime(end_date, "%m/%d/%Y")
        ret = UserTodo.get_user_todo_by_user(o_user)
        if ret.error is not Error.OK:
            return Ret(ret.error)
        user_todos = ret.body

        event_list = []
        for user_todo in user_todos:
            d = datetime.strptime(user_todo.event.end_date, "%m/%d/%Y")
            print(start)
            print(end)
            print(d)
            if start <= d <= end:
                event_list.append(user_todo.event.to_dict())
        return Ret(Error.OK, event_list)

    def to_dict(self):
        return dict(
            user_id=self.user_id,
            event_id=self.event_id,
        )
