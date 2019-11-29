import json

import scrapy

from course_spider.items import CourseItem, SectionItem, TimeSlotItem
from Course.models import Course
from base.error import Error


class CourseSpider(scrapy.Spider):
    name = "course"

    def start_requests(self):
        return [scrapy.FormRequest(
            url='https://secure.its.yale.edu/cas/login?service=https%3A%2F%2Fcoursetable.com%2F%3Fforcelogin%3D1',
            method="POST",
            headers={
                'Content-Type': "application/x-www-form-urlencoded"
            },
            formdata={
                "username": "yz866",
                "password": "ms+lr=2jj"
            },
            callback=self.enter_page
        )]

    def enter_page(self, response):
        seasons = response.xpath("//a[@class='season-link']/attribute::data-season").extract()
        seasons = seasons[1:]
        print("-------------")
        print(seasons)
        print("-------------")
        for season in seasons:
            request = scrapy.Request(
                url="https://coursetable.com/GetDataFile.php?season="+season,
                method="GET",
                callback=self.get_course_for_season
            )
            request.meta["season"] = season
            yield request

    def get_course_for_season(self, response):
        print("-------------")
        print("season: "+response.meta["season"])
        print("-------------")
        if response.text == "":
            return
        data = json.loads(response.text)
        season = response.meta["season"]
        if season.endswith("1"):
            term = season[:4]+" Spring"
        elif season.endswith("2"):
            term = season[:4]+" Summer"
        else:
            term = season[:4]+" Fall"
        for course in data:
            ret = Course.get_course_by_subject_code(course["subject"], course["number"])
            # the course does not exist, then create a new one
            if ret.error is not Error.OK:
                course_item = CourseItem()
                course_item["subject"] = course["subject"]
                course_item["course_code"] = course["number"]
                course_item["title"] = course["long_title"]
                course_item["description"] = course["description"]
                o_course = course_item.save()
            else:
                o_course = ret.body

            section_item = SectionItem()
            section_item["course"] = o_course
            section_item["section_code"] = int(course["section"])
            section_item["instructor"] = ",".join(course["professors"])
            section_item["term"] = term
            section_item["syllabus_url"] = course["syllabus_url"]
            section_item["course_home_url"] = course["course_home_url"]
            o_section = section_item.save()

            # print(course["times"]["by_day"])
            # print(course["course_name_id"])
            if len(course["times"]["by_day"])>0:
                for day, slots in course["times"]["by_day"].items():
                    for slot in slots:
                        timeslot_item = TimeSlotItem()
                        timeslot_item["section"] = o_section
                        timeslot_item["day"] = day
                        timeslot_item["start"] = slot[0]
                        timeslot_item["end"] = slot[1]
                        timeslot_item["room"] = ""
                        if len(slot)>=3:
                            timeslot_item["room"] = slot[2]

                        timeslot_item.save()

        # with open(response.meta["season"]+".json", "w") as f:
        #     f.write(json.dumps(json.loads(response.text), indent=4))

