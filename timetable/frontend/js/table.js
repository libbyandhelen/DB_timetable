// search button on click
// d3.select("#search_btn").on("click", function(){
//     var input = d3.select("#search_input").node().value;
//     console.log("input: " + input);
// });
// svg part
// Extract the width and height that was computed by CSS.
var width = 800;
var height = 1200;
var margin_right = 100;
var cell_w = width / 8;
var cell_h = height / 68;
var tableDiv = document.getElementById("table_area");
var svg = d3.select(tableDiv).append("svg");
var user_id = 12, user
// styles
var font_height = 20, padding = 5, text_hight = 20;
var event_height = 5;
var hScale = d3.scaleLinear().domain([0, 60]).range([0, cell_h]);
var round_corner = 10;
var rect_stroke_width = 2;
// colors
var color10 = d3.scaleOrdinal(d3.schemeCategory10);
var course_text_color = "white";
var text_color = "black";
var rect_stroke_color = "lightgray";
// Use the extracted size to set the size of an SVG element.
var today = new Date();
var sunday = new Date();
var saturday = new Date();
sunday.setDate(today.getDate() - today.getDay());
saturday.setDate(today.getDate() + (6 - today.getDay()));


svg.attr("width", width+margin_right)
   .attr("height", height);
var first_row = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var first_col = ["8:00", "8:15", "8:30", "8:45", "9:00","9:00", "9:15", "9:30", "9:45", "10:00","10:15", "10:30", "10:45"];
var first_col = ["8:00", "9:00", "10:00", "11:00","12:00", "13:00", "14:00", "15:00", "16:00","17:00", "18:00", "19:00", "20:00", "21:00","22:00", "23:00"];
var courses = [{
    id: 1234,
    subject: "CPSC",
    course_code: "527",
    title: "Data Visualizaion",
    description: "it is a course",
    sections: [
        {
            id: 4567,
            course_id: 1234,
            subject: "CPSC",
            course_code: "527",
            course_title: "Data Visualizaion",
            section_code: "1",
            term: "2020 spring",
            instructor: "Holly Rush",
            syllabus_url: "www.google.com",
            course_home_url: "www.home.com",
            meetings: [
                {
                    id: 8632,
                    day: "Tuesday",
                    start: "10",
                    end: "11.3",
                    room: "AKW 200"
                },
                {
                    id: 1232,
                    day: "Thursday",
                    start: "10",
                    end: "11.3",
                    room: "AKW 200"
                }
            ]
        },
        {
            id: 4827,
            course_id: 1234,
            subject: "CPSC",
            course_code: "527",
            course_title: "Data Visualizaion",
            section_code: "2",
            term: "2020 spring",
            instructor: "Holly Rush",
            syllabus_url: "www.google.com",
            course_home_url: "www.home.com",
            meetings: [
                {
                    id: 2324,
                    day: "Monday",
                    start: "9",
                    end: "10.15",
                    room: "AKW 200"
                },
                {
                    id: 1252,
                    day: "Wednesday",
                    start: "9",
                    end: "10.15",
                    room: "AKW 200"
                }
            ]
        },
    ]
},{
    id: 1235,
    subject: "CPSC",
    course_code: "522",
    title: "Operating System",
    description: "it is a course",
    sections: [
        {
            id: 4567,
            course_id: 1235,
            subject: "CPSC",
            course_code: "522",
            course_title: "Operating System",
            section_code: "1",
            term: "2020 spring",
            instructor: "Zhong Shao",
            syllabus_url: "www.google.com",
            course_home_url: "www.home.com",
            meetings: [
                {
                    id: 8632,
                    day: "Tuesday",
                    start: "14.3",
                    end: "15.45",
                    room: "AKW 200"
                },
                {
                    id: 1232,
                    day: "Thursday",
                    start: "14.3",
                    end: "15.45",
                    room: "AKW 200"
                }
            ]
        },
        {
            id: 4827,
            course_id: 1235,
            subject: "CPSC",
            course_code: "522",
            course_title: "Operating System",
            section_code: "2",
            term: "2020 spring",
            instructor: "Zhong Shao",
            syllabus_url: "www.google.com",
            course_home_url: "www.home.com",
            meetings: [
                {
                    id: 2324,
                    day: "Monday",
                    start: "12",
                    end: "13.15",
                    room: "AKW 200"
                },
                {
                    id: 1252,
                    day: "Wednesday",
                    start: "12",
                    end: "13.15",
                    room: "AKW 200"
                }
            ]
        },
    ]
}];

// for drawing table
var table_array = new Array(64);
for(var i=0; i<64; i++) {
    table_array[i] = new Array(7).fill(0);
}
var course_added = []; // section list
var user_section_list = [
    {
        user_id: 64,
        id: 1,
        section: {
            id: 4567,
            course_id: 1234,
            subject: "CPSC",
            course_code: "527",
            course_title: "Data Visualizaion",
            section_code: "1",
            term: "2020 spring",
            instructor: "Holly Rush",
            syllabus_url: "www.google.com",
            course_home_url: "www.home.com",
            meetings: [
                {
                    id: 8632,
                    day: "Tuesday",
                    start: "10",
                    end: "11.3",
                    room: "AKW 200"
                },
                {
                    id: 1232,
                    day: "Thursday",
                    start: "10",
                    end: "11.3",
                    room: "AKW 200"
                }
            ]
        },
        bgcolor: "#2c42a9",
        color: "whilte"
    }
]; // array of userSection
var event_list = [
    {
        id: 24,
        name: "OS hw1",
        end_date: "",
        end_time: "",
        memo: "",
        status: false
    }
];
// not important functions
var toDate = function(t) {
    return d3.timeParse("%m/%d/%Y %I:%M %p")(t);
}

var weekToIdx = function(i) {
    i = i.toLowerCase();
    if(i == "monday") {
        return 1;
    } else if(i == "tuesday") {
        return 2;
    } else if(i == "wednesday") {
        return 3;
    } else if(i == "thursday") {
        return 4;
    } else if(i == "friday") {
        return 5;
    } else if(i == "saturday") {
        return 6;
    } else if(i == "sunday") {
        return 0;
    }
    return -1; // HTBA
}

var getDayToIdx = function(i) { // sunday=7 -> 0
    if(i == 7)
        return 0;
    else
        return i;
}

var timeToIndex = function (m) { // obj meeting
    var start_time_str = d3.format(".2f")(m.start).toString().split(".");
    var start_time_num = 4*(parseInt(start_time_str[0]) - 8) + (parseInt(start_time_str[1])/15);
    var end_time_str = d3.format(".2f")(m.end).toString().split(".");
    var end_time_num = 4*(parseInt(end_time_str[0]) - 8) + (parseInt(end_time_str[1])/15);
    if((parseInt(end_time_str[1])%15) != 0) {
        end_time_num += 1;
    }
    return [parseInt(start_time_num), parseInt(end_time_num)];
}
//  not important functions end
var drawStatic = function() {
    var col = [1, 2, 3, 4, 5 ,6 , 7, 8];
    var row = [];
    for(var i=1; i<=16; i++) {
        row.push(i);
    }
    svg.append("g")
        .selectAll("line")
        .data(col)
        .enter()
        .append("line")
        .attr("x1", (d) => cell_w*d)
        .attr("y1", 10)
        .attr("x2", (d) => cell_w*d)
        .attr("y2", 17*4*cell_h)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1);

    svg.append("g")
        .selectAll("line")
        .data(row)
        .enter()
        .append("line")
        .attr("x1", 50)
        .attr("y1", (d) => cell_h*4*d)
        .attr("x2", cell_w*8)
        .attr("y2", (d) => cell_h*4*d)
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1);
};

drawStatic();
var drawPanel = function() {
    d3.select("#accordion").selectAll(".panel.panel-default").remove();
    var panel = d3.select("#accordion").selectAll(".panel.panel-default").data(courses);

    panel.enter()
        .append("div")
        .attr("class", "panel panel-default")
        .append("div")
        .attr("class", "panel-heading")
        .attr("role", "tab")
        .attr("id", (d, i) => "heading" + (i+1))
        .append("h4")
        .attr("class", "panel-title")
        .append("a")
        .attr("class", "collapsed")
        .attr("role", "button")
        .attr("data-toggle", "collapse")
        .attr("data-parent", "#accordion")
        .attr("href", (d, i) => "#collapse" + (i+1))
        .attr("aria-expanded", "true")
        .attr("aria-controls", (d, i) => "collapse" +(i+1))
        .text(function(d){
            return d.subject + " " + d.course_code + " " + d.title;
        })

    d3.selectAll(".panel.panel-default")
       .append("div")
       .attr("id", (d, i)=> "collapse"+(i+1))
       .attr("class", "panel-collapse collapse")
       .attr("role", "tabpanel")
       .attr("aria-labelledby", "headingOne")
       .append("div")
       .attr("class", "list-group")
       .append("ul")
       .selectAll("li")
       .data(function(d) {
           return d.sections;
       })
       .enter()
       .append("li")
       .attr("class", "list-group-item")
       .append("p")
       .text(d => "Section " + d.section_code)
       .attr("aria-hidden", "true")
       .on("click", function(d, i) { // d is a section
           var flag = true;
           // construct obj and check table_array available
           // console.log(table_array);
           for(var i=0; i<d.meetings.length && flag; i++) {
               if(d.meetings[i].day != "HTBA") {
                   var idx = timeToIndex(d.meetings[i]);
                   // console.log(idx);
                   // check table_array is available
                   for (var j = idx[0]; j <= idx[1]; j++) {
                       if (table_array[j][weekToIdx(d.meetings[i].day)] == 1) {
                           flag = false;
                           alert("Adding course failed. Conflict in table.");
                           break;
                       }
                   }
               }
           }

           if(flag) { // no conflict, start adding&drawing course
                for(var i=0; i<d.meetings.length; i++) {
                    // var idx = timeToIndex(d.meetings[i]);
                    // // check table_array is available
                    // var obj = {
                    //     subject: d.subject,
                    //     course_code: d.course_code,
                    //     course_title: d.course_title,
                    //     course_name: d.course_name,
                    //     section_code: d.section_code,
                    //     room:d.meetings[i].room,
                    //     day: parseInt(weekToIdx(d.meetings[i].day)),
                    //     start_time_str: d3.format(".2f")(d.meetings[i].start).toString().split(".").join(":"),
                    //     end_time_str: d3.format(".2f")(d.meetings[i].end).toString().split(".").join(":"),
                    //     start_idx: idx[0],
                    //     end_idx: idx[1],
                    //     color: d.color
                    // };
                    // mark the table_array occupied
                    if(d.meetings[i].day !== "HTBA") {
                        for(var j=idx[0]; j<=idx[1]; j++) {
                            table_array[j][weekToIdx(d.meetings[i].day)] = 1;
                        }
                    }
                }

                // BACKEND: POST && GET new user_section_list
                // user_section_list.push(d);
               var data = {
                    "bg_color": color10(d.id),
                    "color": "white",
                   "section_id": d.id
               }
                request('/api/usersections/', "POST", data, afterCreateUserSection)
                // sync_table_array();
                // drawList();
                // drawTableContent();
            }
       })
       .selectAll("p meeting")
       .data((section) => section.meetings)
       .enter()
       .append("p")
       .text(function(m) {
        // syllabus_url: "www.google.com",
        // course_home_url: "www.home.com",
        // meetings: [
            // id: 8632,
            // day: "Tuesday",
            // start: "10",
            // end: "11.3",
            // room: "AKW 200"
            var meetings = "";
            var start_time = d3.format(".2f")(m.start).toString().split(".").join(":");
            var end_time = d3.format(".2f")(m.end).toString().split(".").join(":");
            meetings += m.day.substr(0, 3) + " " + start_time + " - " + end_time + "  " + m.room;

           return meetings;
       });
}

svg.append("g").attr("id", "courseList");
var drawList = function() { // about remove
    //<div className="panel panel-primary" id="remove_course">
    //               <div className="panel-heading">
    //                   <h3 className="panel-title">Courses</h3>
    //               </div>
    //               <div className="panel-body">
    //                 Panel content
    //               </div>
    //             </div>
    //
    //             <div className="panel panel-danger" id="remove_event">
    //               <div className="panel-heading" >
    //                 <h3 className="panel-title">Deadlines</h3>
    //               </div>
    //               <div className="panel-body">
    //                 Panel content
    //               </div>
    //                 <div className="panel-body">
    //                 Panel content
    //               </div>
    //                 <div className="panel-body">
    //                 Panel content
    //               </div>
    //             </div>

    d3.select("#remove_course").selectAll(".panel-body").remove();
    d3.select("#remove_course")
        .selectAll("panel-body")
        .data(user_section_list)
        .enter()
        .append("div")
        .attr("class", "panel-body")
        .text((d) => d.section.subject + d.section.course_code + " " + d.section.course_title)
        .on("click", function (d) {
            // BACKEND: delete & get new user_section_list

            var data = {
                "section_id": d.section.id
            };
            request("/api/usersections/", "DELETE", data, afterDeleteUserSection)
        })

    d3.select("#remove_event").selectAll(".panel-body").remove();
    d3.select("#remove_event")
        .selectAll("panel-body")
        .data(event_list)
        .enter()
        .append("div")
        .attr("class", "panel-body")
        .text((d) => d.name)
        .on("click", function (d) {
            // BACKEND: delete & get new event_list

            var data = {
                "event_id": d.id
            }
            request('/api/events/', "DELETE", data, afterDeleteEvent)
        })
    // var low_bound = 0;
    // svg.select("#courseList").selectAll("*").remove();
    // svg.select("#courseList")
    //     .selectAll("text course")
    //     .data(user_section_list)
    //     .enter()
    //     .append("text")
    //     .attr("class", "text")
    //     .attr("x", 800)
    //     .attr("y", function(d, i) {
    //         low_bound = 80 + i * text_hight;
    //         return low_bound;
    //     })
    //     .attr("fill", text_color)
    //     .text((d) => d.section.subject + d.section.course_code + "-" + d.section.section_code)
    //     .on("click", function(d){
    //         // BACKEND: delete & get new user_section_list
    //
    //         var data = {
    //             "section_id": d.section.id
    //         };
    //         request("/api/usersections/", "DELETE", data, afterDeleteUserSection)
    //     });
    // //  draw deadline list below
    // svg.select("#courseList")
    //     .selectAll("text deadline")
    //     .data(event_list)
    //     .enter()
    //     .append("text")
    //     .attr("class", "text")
    //     .attr("x", 800)
    //     .attr("y", (d, i) => low_bound + (i+1) * text_hight)
    //     .attr("fill", text_color)
    //     .text((d) => d.name)
    //     .on("click", function(d){
    //         // BACKEND: delete & get new event_list
    //
    //         var data = {
    //             "event_id": d.id
    //         }
    //         request('/api/events/', "DELETE", data, afterDeleteEvent)
    //     });
}

var calculateToday = function(delta_day) {
    sunday.setDate(sunday.getDate() + delta_day);
    saturday.setDate(saturday.getDate() + delta_day);
}

svg.append("g").attr("id", "g_table");
var drawTableContent = function() {
    d3.select("#g_table").selectAll("*").remove();
    // draw rect
    svg.select("#g_table")
        .selectAll("g.course")
        .data(user_section_list)
        .enter()
        .append("g")
        .selectAll("g.rectcourse")
        .data(function(section) { // user section
            return section.section.meetings.map(function(d)
            {
                var idx = timeToIndex(d);
                return {
                    section_id: section.section.id,
                    subject: section.section.subject,
                    course_code: section.section.course_code,
                    course_title: section.section.course_title,
                    section_code: section.section.section_code,
                    day: parseInt(weekToIdx(d.day)),
                    start_time_str: d3.format(".2f")(d.start).toString().split(".").join(":"),
                    end_time_str: d3.format(".2f")(d.end).toString().split(".").join(":"),
                    start_idx: idx[0],
                    end_idx: idx[1],
                    room: d.room,
                    bgcolor: section.bgcolor,
                    color: section.color
                };
            });
        })
        .enter()
        .append("rect")
        .attr("x", (d) => cell_w*(d.day+1))
        .attr("y", (d) => cell_h*(d.start_idx+4))
        .attr("rx", round_corner)
        .attr("ry", round_corner)
        .attr("stroke", rect_stroke_color)
        .attr("stroke-width", rect_stroke_width)
        .attr("height", function(d) {
            return cell_h * (d.end_idx - d.start_idx);
        })
        .attr("width", cell_w)
        .attr("fill", function(d, i) { // user section
            // console.log(d)
            return d.bgcolor;
        })
        .on("mouseover", function(d) {
            var xPosition = parseFloat(d3.select(this).attr("x"))+70;
            var yPosition = parseFloat(d3.select(this).attr("y"));

            d3.select("#tooltip1")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value11")
                .text(d.subject + d.course_code + "-" + d.section_code);
            d3.select("#value12")
                .text(d.course_title);
            d3.select("#value13")
                .text(d.start_time_str + " - " + d.end_time_str);
            d3.select("#value14")
                .text(d.room);

            //Show the tooltip
            d3.select("#tooltip1").classed("hidden", false);
        })
        .on("mouseout", function(){
            d3.select("#tooltip1").classed("hidden", true);
        });

    // draw text for course info

    svg.select("#g_table")
        .selectAll(".course_code")
        .data(user_section_list)
        .enter()
        .append("g")
        .selectAll("g.course_info")
        .data(function(section) {
            return section.section.meetings.map(function(d)
            {
                var idx = timeToIndex(d);
                return {
                    subject: section.section.subject,
                    course_code: section.section.course_code,
                    course_title: section.section.course_title,
                    section_code: section.section.section_code,
                    day: parseInt(weekToIdx(d.day)),
                    start_time_str: d3.format(".2f")(d.start).toString().split(".").join(":"),
                    end_time_str: d3.format(".2f")(d.end).toString().split(".").join(":"),
                    start_idx: idx[0],
                    end_idx: idx[1],
                    bgcolor: section.section.bgcolor,
                    color: section.section.color
                };
            });
        })
        .enter()
        .append("text")
        .attr("x", (d) => padding + cell_w*(d.day+1))
        .attr("y", (d) => cell_h*(d.start_idx+4) + font_height)
        .attr("fill", course_text_color)
        .text((d) => d.subject + d.course_code + "-" + d.section_code);
    // draw start time
    svg.select("#g_table")
        .selectAll(".course_code")
        .data(user_section_list)
        .enter()
        .append("g")
        .selectAll("g.rectcourse")
        .data(function(section) {
            return section.section.meetings.map(function(d)
            {
                var idx = timeToIndex(d);
                return {
                    subject: section.section.subject,
                    course_code: section.section.course_code,
                    course_title: section.section.course_title,
                    section_code: section.section.section_code,
                    day: parseInt(weekToIdx(d.day)),
                    start_time_str: d3.format(".2f")(d.start).toString().split(".").join(":"),
                    end_time_str: d3.format(".2f")(d.end).toString().split(".").join(":"),
                    start_idx: idx[0],
                    end_idx: idx[1],
                    bgcolor: section.section.bgcolor,
                    color: section.section.color
                };
            });
        })
        .enter()
        .append("text")
        .attr("x", (d) => padding + cell_w*(d.day+1))
        .attr("y", (d) => cell_h*(d.start_idx+4) + 2.5*font_height)
        .attr("fill", course_text_color)
        .text((d) => d.start_time_str + " - ");
    // draw end time
    svg.select("#g_table")
        .selectAll(".course_code")
        .data(user_section_list)
        .enter()
        .append("g")
        .selectAll("g.rectcourse")
        .data(function(section) {
            return section.section.meetings.map(function(d)
            {
                var idx = timeToIndex(d);
                return {
                    subject: section.section.subject,
                    course_code: section.section.course_code,
                    course_title: section.section.course_title,
                    section_code: section.section.section_code,
                    day: parseInt(weekToIdx(d.day)),
                    start_time_str: d3.format(".2f")(d.start).toString().split(".").join(":"),
                    end_time_str: d3.format(".2f")(d.end).toString().split(".").join(":"),
                    start_idx: idx[0],
                    end_idx: idx[1],
                    bgcolor: section.section.bgcolor,
                    color: section.section.color
                };
            });
        })
        .enter()
        .append("text")
        .attr("x", (d) => padding + cell_w*(d.day+1))
        .attr("y", (d) => cell_h*(d.start_idx+4) + 4*font_height)
        .attr("fill", course_text_color)
        .text((d) => d.end_time_str);

}

svg.append("g").attr("id", "g_first_rc")
var drawTable = function() {
    svg.select("#g_first_rc").selectAll("*").remove();
    svg.select("#g_first_rc")
        .selectAll("text first_row")
       .data(first_row)
       .enter()
       .append("text")
       .attr("x", (d, i) => cell_w*(i+1) + 15)
       .attr("y", 30)
        .attr("class", (d) => "weekday" + (weekToIdx(d))) // weekday0 => sunday
       .text(d => d);

    // draw date
    var cur = new Date(sunday);
    for(var i=0; i<7; i++) {
        // Dec => getMonth is 11
        var text = (cur.getMonth()+1) + "/" + cur.getDate() + "/" + cur.getFullYear();
        svg.select("#g_first_rc")
            .append("text")
            .attr("class", "weekday" + i)
            .attr("x", cell_w*(i+1) + 15)
            .attr("y", 45)
            .text(text);
        cur.setDate(cur.getDate() + 1);
    }

    // check event deadline
    // console.log(event_list)
    event_list.forEach(function(d) {
        // console.log(svg.select(".weekday" + getDayToIdx(toDate(d.end_date + " " + d.end_time).getDay())));
        svg.selectAll(".weekday" + getDayToIdx(toDate(d.end_date + " " + d.end_time).getDay()))
           .attr("fill", "red");
    });
    svg.select("#g_first_rc")
        .selectAll("text first_col")
       .data(first_col)
       .enter()
       .append("text")
       .attr("x", 10)
       .attr("y", (d, i) => cell_h*4*(i+1)+7)
       .text(d => d);

    drawTableContent();
}


svg.append("g").attr("id", "g_event");
var drawEvent = function() {
    svg.select("#g_event").selectAll("*").remove();
    // draw rect line:
    svg.select("#g_event")
        .selectAll("rect.event")
        .data(event_list)
        .enter()
        .append("rect")
        .each(function(d) {
            d.date = toDate(d.end_date + " " + d.end_time);
            // change color of weekday with event
            svg.select("#weekday" + getDayToIdx(d.date.getDay())).attr("fill", "red");
        })
        .attr("x", (d) => cell_w*(getDayToIdx(d.date.getDay()) + 1))
        // 4*(parseInt(d.date.getHours()) - 8) + (parseInt(d.date.getMinutes())/15);
        .attr("y", function(d){
            var end_time_index = cell_h * 4*(parseInt(d.date.getHours()) - 8 + 1) + hScale(parseInt(d.date.getMinutes()));
            return end_time_index;
        })
        .attr("height", event_height)
        .attr("width", cell_w)
        .attr("fill", "red")
        .attr("opacity", 0.75)
        .on("mouseover", function(d) {
            var xPosition = parseFloat(d3.select(this).attr("x"))+70;
            var yPosition = parseFloat(d3.select(this).attr("y"));

            d3.select("#tooltip2")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#value21")
                .text(d.name);
            d3.select("#value22")
                .text(d.end_date + " " + d.end_time);
            d3.select("#value23")
                .text(d.memo);

            //Show the tooltip
            d3.select("#tooltip2").classed("hidden", false);
        })
        .on("mouseout", function(){
            d3.select("#tooltip2").classed("hidden", true);
        });
    // draw small alarming rect:
    // svg.selectAll("rect.event")
    //     .data(event_list)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d) => cell_w*d.date.getDay())
    //     // 4*(parseInt(d.date.getHours()) - 8) + (parseInt(d.date.getMinutes())/15);
    //     .attr("y", function(d){
    //         var end_time_index = cell_h * 4*(parseInt(d.date.getHours()) - 8 + 1) + hScale(parseInt(d.date.getMinutes()));
    //         return end_time_index;
    //     })
    //     .attr("height", event_height)
    //     .attr("width", cell_w)
    //     .attr("fill", "red")
    //     .on("mouseover", function(d) {
    //         console.log("hover on event");
    //         console.log(d);
    //     });
}

var sync_table_array = function() {
    table_array = new Array(64);
    for(var i=0; i<64; i++) {
        table_array[i] = new Array(7).fill(0);
    }
    for(var i=0; i<user_section_list.length; i++) {
        for(var j=0; j<user_section_list[i].section.meetings.length; j++) {
            var idx = timeToIndex(user_section_list[i].section.meetings[j]);
            var day = weekToIdx(user_section_list[i].section.meetings[j].day);
            if(day != -1) {
                for(var k=idx[0]; k<=idx[1]; k++) {
                    table_array[k][day] = 1;
                }
            }
        }
    }
}

var afterTerm = function (termData) {
    if(termData.code!==0){
        console.log(termData.msg)
    }
    else{
        d3.select(".dropdown").selectAll("option")
            .data(termData.body.sort().reverse())
            .enter()
            .append("option")
            .text(function (d) {
                return d
            })

        d3.select("#search_btn").on("click", function(){
            var input = d3.select("#search_input").node().value;
            var term = d3.select(".dropdown").node().value
            console.log(term)
            request('/search/?q='+input+'&term='+term, 'GET', null, afterSearch)
        });
    }
}

var afterSearch = function (data) {
    courses = data.body
    console.log(courses)
    drawPanel();
}

var afterLogout = function (data) {
    if(data.code!==0){
        console.log(data.msg)
    }
    else{
        window.location.href = '/signup'
    }
}

var afterCreateUserSection = function(data){
    if(data.code!==0){
        console.log((data.msg))
    }
    else{
        request('/api/usersections', "GET", null, afterGetUserSections)
    }
}

var afterGetUserSections = function(data){
    if(data.code!== 0){
        console.log((data.msg))
    }
    else{
        user_section_list = data.body
        var d = {
            "start_date":(sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear(),
            "end_date": (saturday.getMonth()+1)+'/'+saturday.getDate()+'/'+saturday.getFullYear()
        }
        request('/api/events/week', "POST", d, afterWeek)
    }
}

var afterGetEvents = function(data){
    if(data.code!==0){
        console.log((data.msg))
    }
    else{
        event_list = data.body
        sync_table_array();
        drawList();
        drawTable();
        drawEvent();
    }
}

// var afterGetEvents2 = function (data) {
//     if(data.code!==0){
//         console.log((data.msg))
//     }
//     else{
//         event_list = data.body
//         sync_table_array();
//         drawList();
//         drawTable();
//         drawEvent();
//     }
// }

var afterDeleteUserSection = function(data){
    if(data.code!==0){
        console.log(data.msg)
    }
    else{
        request('/api/usersections', "GET", null, afterGetUserSections)
    }
}

var afterCreateUserTodo = function (data) {
    if(data.code!==0){
        console.log(data.msg)
    }
    else{
        var d = {
            "start_date":(sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear(),
            "end_date": (saturday.getMonth()+1)+'/'+saturday.getDate()+'/'+saturday.getFullYear()
        }
        request('/api/events/week', "POST", d, afterWeek)
    }
}

var afterCreateEvent = function(data){
    if(data.code!==0){
        console.log(data.msg)
    }
    else{
        var d = {
            "event_id": data.body.id,
        }
        request('/api/events/todo', "POST", d, afterCreateUserTodo)
    }
}

var afterDeleteEvent = function(data){
    if(data.code !== 0){
        console.log(data.msg)
    }
    else{
        var d = {
            "start_date":(sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear(),
            "end_date": (saturday.getMonth()+1)+'/'+saturday.getDate()+'/'+saturday.getFullYear()
        }
        request('/api/events/week', "POST", d, afterWeek)
    }
}

var afterWeek = function(data){
    if(data.code !== 0){
        console.log(data.msg)
    }
    else{
        event_list = data.body
        sync_table_array();
        drawList();
        drawTable();
        drawEvent();
    }
}

// main functions here:
request('/api/courses/terms', 'GET', null, afterTerm)
request('/api/usersections', "GET", null, afterGetUserSections)
d3.select("#sign-out-button").on("click", function () {
    d3.event.preventDefault();
    request('/api/user/logout', 'POST', null, afterLogout)
})
var data = {
    "start_date":(sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear(),
    "end_date": (saturday.getMonth()+1)+'/'+saturday.getDate()+'/'+saturday.getFullYear()
}
request('/api/events/week', "POST", data, afterWeek)
// drawTable();
// drawPanel();
// drawList();




d3.select("#pre-button").on("click", function () {
    calculateToday(-7)
    var data = {
        "start_date":(sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear(),
        "end_date": (saturday.getMonth()+1)+'/'+saturday.getDate()+'/'+saturday.getFullYear()
    }
    request('/api/events/week', "POST", data, afterWeek)
})

d3.select("#next-button").on("click", function () {
    calculateToday(7)
    var data = {
        "start_date":(sunday.getMonth()+1)+'/'+sunday.getDate()+'/'+sunday.getFullYear(),
        "end_date": (saturday.getMonth()+1)+'/'+saturday.getDate()+'/'+saturday.getFullYear()
    }
    request('/api/events/week', "POST", data, afterWeek)
})


d3.select("#done_btn").on("click", function() {
  var event_name = d3.select("#inputName3").node().value;
  // console.log("event_name: " + event_name);
  var event_time = d3.select("#inputDeadline").node().value;
  // console.log("event_time: " + event_time);
  var memo = d3.select("#inputMemo").node().value;
  // console.log("memo: " + memo);

  var data = {
      "name": event_name,
      "end_date": event_time.split(" ")[0],
      "end_time": event_time.split(' ')[1]+" "+event_time.split(' ')[2],
      "memo": memo,
      "status": false
  }
  d3.select("#inputName3").node().value = "";
    d3.select("#inputDeadline").node().value = "";
    d3.select("#inputMemo").node().value = "";
  request('/api/events/', "POST", data, afterCreateEvent)
})


