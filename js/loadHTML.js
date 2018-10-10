var username = null;

$(document).ready(function () {
    var inited = false;
    var loading = $(function () {
        if ($("#header").length != 0) {
            $("#header").load("header.html");
            $("#footer").load("footer.html");
            getCurrentSession();
        }

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

    });


    var pathname = window.location.pathname;

    if (pathname.includes("result") || pathname.includes("recipe")) {
        loadRecipe();
    }
});


function getCurrentSession() {

    $.ajax({
        url: 'php/login.php',
        type: 'post',
        data: {"callGetSession": ""},
        success: function (data) {
            console.log(data);
            if (data != "fail") {
                $("#signinDiv").css("display", "none");
                $("#loggedinDiv").css("display", "block");
                $("#usernameDisplay").text(data);
                username = data;
            }
        },
        error: function (data) {
            console.log("error");
            username = null;
        }
    });
}

function checkLogin() {
    var username = $('#inputUsername').val();
    var psw = $('#inputPassword').val();

    if (username == "" || username == null || psw == "" || psw == null) {
        $("#error").text("Password or username cannot be empty.");
        $(".errorMessage").css("display", "block");
    } else if (/^[a-zA-Z0-9- ]*$/.test(username) == false ||
        /^[a-zA-Z0-9- ]*$/.test(psw) == false) {
        $("#error").text("Special characters not allowed");
        $(".errorMessage").css("display", "block");
    } else {
        $(".errorMessage").css("display", "none");
        var input = username + ":" + psw;
        $.ajax({
            url: 'php/login.php',
            type: 'post',
            data: {"callLogin": input},
            success: function (data) {
                console.log(data);
                if (data == "success") {
                    location.reload();
                } else {
                    $("#error").text("Username or password incorrect.");
                    $(".errorMessage").css("display", "block");
                    username = null;
                }
            },
            error: function (data) {
                $("#error").text("Something went wrong, please try again later.");
                $(".errorMessage").css("display", "block");
                username = null;
            }
        });
    }
}

function logout() {
    $.ajax({
        url: 'php/login.php',
        type: 'post',
        data: {"callLogout": ""},
        success: function (data) {
            $("#loggedinDiv").css("display", "none");
            window.location.href = 'index.html';
            $("#signinDiv").css("display", "block");
            username = null;
            location.reload();
        },
        error: function (data) {
            console.log("error");
        }
    });
}

function checkLogged() {
    if (username != null) {
        window.location.href = "createRecipe.html";
    } else {
        window.location.href = "login.html";
    }
}

function searchWord(val) {
    var keyword;
    if (val == true) {
        keyword = $("#searchBar").val();
    } else {
        keyword = $("#mainSearch").val();
    }
    window.location.href = "result.html?title=" + keyword;
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}