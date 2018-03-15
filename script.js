var articleName;

$(document).ready(function() {
    // disable form submit - so that enter doesn't refresh page
    // source: https://stackoverflow.com/questions/9347282/using-jquery-preventing-form-from-submitting
    $("form").submit(function(e) {
        e.preventDefault();
    })

    // source: https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
    $(document).keypress(function(e) {
        if (e.which == 13) {
            getTextFromSearch(getWikipediaData);
        }
    });

    // initialize tootltips
    $("#randomButton").tooltip({ delay: { show: 100 } });
    $("#searchButton").tooltip({ delay: { show: 100 } });

    $("#searchButton").on("click", function() {
        getTextFromSearch(getWikipediaData);
    });

    function addWikiArticles(results) {
        $(".list-group").empty();
        for (i = 0; i < results[1].length; i++) {
            $(".list-group").append("<a href=\"" + results[3][i] + "\" class=\"list-group-item list-group-item-action\">" +
                "<h3>" + results[1][i] + "</h3>" + results[2][i] + "</a>");
        }
    }

    function getTextFromSearch(callback) {
        articleName = $("#searchBox").val();
        if (articleName == "") {
            alert("You need to enter something!")
        } else {
            callback();
        }
    }

    function getWikipediaData() {
        $.ajax({
                type: "GET",
                dataType: "jsonp",
                data: {
                    action: "opensearch",
                    search: articleName,
                    format: "json",
                    limit: "10",
                    utf8: "1",
                },
                url: "https://en.wikipedia.org/w/api.php",
            })
            .done(function(data) {
                console.log(data);
                addWikiArticles(data);
            });
    }
});