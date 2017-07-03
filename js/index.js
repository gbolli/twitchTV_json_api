$(document).ready(function() {
  
  // Variables
  var watchList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]; //, "comster404"]; test for user not found
  var apiUrlBase = "https://wind-bow.gomix.me/twitch-api/";  // freeCodeCamp alternative api
  
  var streamsUrl = "streams/";
  var channelsUrl = "channels/";
  
  var offline = "Offline";
  var noAcct = "This account does not exist";
  
  //  Nav buttons to filter all/online/offline

  $(".nav li").on("click", function() {
    $(".nav li").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr('id');
    $(".online, .offline").removeClass("hidden");
    if (status === "online") {
      $(".offline").addClass("hidden");
    } else if (status === "offline") {
      $(".online").addClass("hidden");
    }
  });

  // search bar function



  // create API url function

  function getApiUrl(type, acct) {
    return apiUrlBase + type + acct + "?callback=?";
  }

  // API Call function

  function apiCalls() {

    for (var i = 0; i < watchList.length; i++) {

      //create enclosing function to prevent issues with async

      (function(i) {

      // User variables

      var name = watchList[i];
      var status;
      var streamingStatus;
      var twitchUrl;
      var logoUrl;
      var displayName;
      var game;
      var statusText;
      var feedImage;
      var feedImageLarge;
      var errorMessage;
    
      // Apply data to HTML

      $.getJSON(getApiUrl(streamsUrl, name))

        // STREAM call

        .then(function(data) {
          
          console.log("This is the STREAM Call for " + name);
          console.log(data); // testing
          
          streamingStatus = (data.stream === null) ? "inactive" : "active";
          
          feedImage = (data.stream === null) ? "http://via.placeholder.com/80x45" : data.stream.preview.small;

          return name;
        })
        .then(function(twitchName) {
          return $.getJSON(getApiUrl(channelsUrl, twitchName));
        })
        .then(function(data2) {
              
              // USER call

              console.log("This is the USER Call for " + data2.display_name);
              console.log(data2); // testing

              twitchUrl = data2.url;
              logoUrl = (data2.logo) ? data2.logo : "http://via.placeholder.com/50x50";
              displayName = data2.display_name;
              game = data2.game;
              statusText = data2.status;

              if (streamingStatus === "inactive") {
                if (data2.display_name === undefined) {
                    // user not found
                  $("#streams").append("<li class='noAcct'><img class='avatar'src='http://via.placeholder.com/50x50'><a href='#'>User Not Found</a><span>" + data2.message + "</span></li>");

                } else {
                    // offline
                    status = offline;
                    $("#streams").append("<li class='offline'><img class='avatar'src='" + logoUrl + "'><a href='" + twitchUrl + "'>" + displayName + "</a><span>" + status + "</span></li>");
                }
                  
                } else {
                    // online
                    console.log("Online status");
                    $("#streams").append("<li class='online'><img class='avatar'src='" + logoUrl + "'><a href='" + twitchUrl + "'>" + displayName + "</a><img src='" + feedImage + "'><span>" + game + "</span></li>");
                  }
        }); // end of USER call
     })(i);  // end of enclosing function
    } // end of for loop
  }; // end of apiCalls function
      
  
  apiCalls();

});