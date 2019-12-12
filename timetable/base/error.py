class Error:
    """Error class"""
    NO_SEARCH_PARAMETER = 1021
    USER_TODO_NOT_EXIST = 1020
    ERROR_CREATE_EVENT = 1019
    EVENT_NOT_EXIST = 1018
    SECTION_ALREADY_SELECTED = 1017
    USER_SECTION_NOT_MATCH = 1016
    SELECT_SECTION_NOT_EXIST = 1015
    ERROR_CREATE_SELECTSECTION = 1014
    SECTION_NOT_BELONG_TO_COURSE = 1013
    SECTION_NOT_EXIST = 1012
    COURSE_NOT_EXIST = 1011
    USER_NOT_EXIST = 1010
    WRONG_PASSWORD = 1009
    ERROR_CREATE_USER = 1008
    EXIST_USERNAME = 1007

    REQUIRE_ADMIN = 1006
    STRANGE = 1005
    ERROR_METHOD = 1004
    REQUIRE_LOGIN = 1003
    REQUIRE_JSON = 1002
    REQUIRE_PARAM = 1001
    NOT_FOUND_ERROR = 1000
    OK = 0

    ERROR_TUPLE = (
        (NO_SEARCH_PARAMETER, "no search parameters"),
        (USER_TODO_NOT_EXIST, "Usertodo does not exist"),
        (ERROR_CREATE_EVENT, "Error when creating the event"),
        (EVENT_NOT_EXIST, "Event does not exist"),
        (SECTION_ALREADY_SELECTED, "section is already selected"),
        (USER_SECTION_NOT_MATCH, "user and section does not match"),
        (SELECT_SECTION_NOT_EXIST, "usersection dest not exist"),
        (ERROR_CREATE_SELECTSECTION, "error creating usersection"),
        (SECTION_NOT_BELONG_TO_COURSE, "Section does not belong to course"),
        (SECTION_NOT_EXIST, "Section does not exist"),
        (COURSE_NOT_EXIST, "Course does not exist"),
        (USER_NOT_EXIST, "Username does not exist"),
        (WRONG_PASSWORD, "Wrong password"),
        (ERROR_CREATE_USER, "Error when creating user"),
        (EXIST_USERNAME, "Username already exists"),

        (REQUIRE_ADMIN, "Require Admin"),
        (ERROR_METHOD, 'Error HTTP Request Method'),
        (REQUIRE_LOGIN, "Require Login"),
        (REQUIRE_JSON, "Require JSON"),
        (REQUIRE_PARAM, "Require Parameter: "),
        (NOT_FOUND_ERROR, "Error Not Exist"),
        (OK, "ok"),
    )