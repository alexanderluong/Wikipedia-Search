var articleName;

$(document).ready(function() {
    // initialize tootltips
    articleName = "example";
    $("#randomButton").tooltip({ delay: { show: 100 } });
    $("#searchButton").tooltip({ delay: { show: 100 } });

    $("#searchButton").on("click", function() {
        console.log("ouch!");
    })
    getWikipediaData();

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
            });
    }
});