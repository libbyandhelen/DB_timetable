// search button on click
var tableDiv = document.getElementById("table_area");
var svg = d3.select(tableDiv).append("svg");
var first_row = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var first_col = ["8:00", "9:00", "10:00", "11:00","12:00", "13:00", "14:00", "15:00", "16:00","17:00", "18:00", "19:00", "20:00", "21:00","22:00", "23:00"];
// d3.select("#search_input").on("change", function () {
//     request('/search/?q='+d3.select(this).node().value, 'GET', null, afterSearch)
// })
var courses;
var drawTable = function() {

    // Extract the width and height that was computed by CSS.
    var width = 800;
    var height = 1200;
    var cell_w = width / 8;
    var cell_h = height / 68;
    // Use the extracted size to set the size of an SVG element.
    svg
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("text first_row")
       .data(first_row)
       .enter()
       .append("text")
       .attr("x", (d, i) => cell_w*(i+1))
       .attr("y", 30)
       .text(d => d);

    svg.selectAll("text first_col")
       .data(first_col)
       .enter()
       .append("text")
       .attr("x", 10)
       .attr("y", (d, i) => cell_h*4*(i+1))
       .text(d => d);
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
drawTable();
request('/api/courses/terms', 'GET', null, afterTerm)

d3.select("#sign-out-button").on("click", function () {
    d3.event.preventDefault();
    request('/api/user/logout', 'POST', null, afterLogout)
})

var afterLogout = function (data) {
    if(data.code!==0){
        console.log(data.msg)
    }
    else{
        window.location.href = '/signup'
    }
}

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
       .on("click", function(d) {
            console.log(d);
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