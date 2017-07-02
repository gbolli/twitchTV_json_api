$(document).ready(function() {
  
  // Variables
  var watchList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var apiUrlBase = "https://wind-bow.gomix.me/twitch-api/";
  var streamsUrl = "streams/"
  var corsUrl = "https://cors-anywhere.herokuapp.com/"; //"https://crossorigin.me/"; 
  
  var yes = "Y";
  var no = "Offline";
  var status;
  
  //  All users button
  getTwitchData();
  
  //  Online button
  
  
  //  Offline button
  
  
  // API Call
  
  function getTwitchData() {
   
    var apiUrl = apiUrlBase + streamsUrl + "freecodecamp" + "?callback=?";
        
        $.ajax({
      type: 'GET',
      dataType: 'json',
      url: apiUrl,
      
      
      success: function(data) {
        
        console.log(data); // testing
        
        if (data.stream == null) {
          status = no;
        } else {
          status = yes;
        };
        
        $("#streams").append("<li><img class='avatar'src='http://placehold.it/50x50'><a href='" + data.stream + "'>" + "FreeCodeCamp" + "</a><span>" + status + "</li>");
        
        }
      
    });
  }
  
});