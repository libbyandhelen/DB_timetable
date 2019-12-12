// import * as d3 from "./d3";
d3.select("#sign-up-link").on("click", function () {
    d3.select("#signup-form").style("display", "block")
    d3.select("#login-form").style("display", "none")
})

d3.select("#login-link").on("click", function () {
    d3.select("#signup-form").style("display", "none")
    d3.select("#login-form").style("display", "block")
})

d3.select("#login-button").on("click", function () {
    d3.event.preventDefault();
    var data = {
        "username": d3.select("#username1").node().value,
        "password": d3.select("#pass1").node().value,
    }
    // console.log(data)
    request(`/api/user/login`, 'POST', data, afterlogin)
})

d3.select("#signup-button").on("click", function () {
    d3.event.preventDefault();
    var data = {
        "username": d3.select("#username2").node().value,
        "password": d3.select("#pass2").node().value,
    }
    // console.log(data)
    request(`/api/user/`, 'POST', data, afterSignup)
})

var afterlogin = function (data) {
    if(data.code !== 0){
        d3.select("#error1")
            .text(data.msg)
    }
    else{
        d3.select("#error1")
            .text("")
        window.location.href = '/timetable'
    }
}

var afterSignup = function (data) {
    if(data.code !== 0){
        d3.select("#error2")
            .text(data.msg)
    }
    else{
        d3.select("#error2")
            .text("")
        window.location.href = '/timetable'
    }
}