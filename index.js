$(document).ready(function () {

    $("#explore-form").submit(function (event) {
        event.preventDefault();
        var userInput = $("#query").val();
        getResults(userInput);
    });


    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 10,
                key: "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                q: userSearchTerm,
                type: "video"
            },
            function (receivedApiData) {
                console.log(receivedApiData);
                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                else {
                    displayExploreResults(receivedApiData.items);
                }
            });
    }

    function displayExploreResults(videosArray) {

        var buildTheHtmlOutput = "";

        $.each(videosArray, function (videosArrayKey, videosArrayValue) {
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output vide title
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
            buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";
        });

        $("#explore-results ul").html(buildTheHtmlOutput);
    }
});