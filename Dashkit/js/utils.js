"use strict";

function initDarkmode() {
    checkCookie();
    if(getMode() == "1") {
        $("#stylesheetDark").removeAttr("disabled");
        $("#stylesheetLight").attr("disabled", "disabled");
        $(".darkmodeIcon").removeClass("fe-sun");
        $(".darkmodeIcon").addClass("fe-moon");
        $.ajax({
            type: "GET",
            url: "/api/v1/client/settings/darkmode/1/",
            success: function(data) {},
            error: function(data) {}
        });
    } else {
        $("#stylesheetLight").removeAttr("disabled");
        $("#stylesheetDark").attr("disabled", "disabled");
        $(".darkmodeIcon").addClass("fe-sun");
        $(".darkmodeIcon").removeClass("fe-moon");
        $.ajax({
            type: "GET",
            url: "/api/v1/client/settings/darkmode/0/",
            success: function(data) {},
            error: function(data) {}
        });
    }
}

function changeMode() {
    if(getMode() == "1") {
        setMode("0");
    } else {
        setMode("1");
    }
    initDarkmode();
}

function setMode(dark) {
    setCookie("darkmode", dark, 365);
}

function getMode() {
    return getCookie("darkmode");
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var darkmode = getCookie("darkmode");
    if (darkmode == "") {
        setCookie("darkmode", "0", 365);
    }
}