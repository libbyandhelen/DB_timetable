from django.shortcuts import render

from base.decorator import require_login


def signup_page(request):
    return render(request, 'signup.html')


@require_login
def timetable_page(request):
    return render(request, 'index.html')
